import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

interface WebhookPayload {
  _type?: string;
  tags?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const hasSignature = Boolean(req.headers.get('sanity-webhook-signature'));

    let body: WebhookPayload | null = null;

    if (hasSignature) {
      const { isValidSignature, body: parsedBody } = await parseBody<WebhookPayload>(
        req,
        secret
      );
      if (secret && !isValidSignature) {
        return new Response('Invalid signature', { status: 401 });
      }
      body = parsedBody;
    } else {
      // Direct call (manual revalidation or developer test)
      const tokenHeader = req.headers.get('x-revalidate-secret');
      const tokenQuery = req.nextUrl.searchParams.get('secret');
      if (secret && tokenHeader !== secret && tokenQuery !== secret) {
        return new Response('Unauthorized', { status: 401 });
      }
      try {
        body = (await req.json()) as WebhookPayload;
      } catch {
        body = null;
      }
    }

    const revalidatedTags: string[] = [];

    const triggerTag = (tag: string) => {
      revalidateTag(tag, 'max');
      if (!revalidatedTags.includes(tag)) {
        revalidatedTags.push(tag);
      }
    };

    if (body?._type) {
      if (body._type === 'product') {
        triggerTag('products');
      }
      if (body._type === 'partner') {
        triggerTag('partners');
      }
      if (body._type === 'qualityCert') {
        triggerTag('quality');
      }
      if (body._type === 'companyProfile') {
        triggerTag('company');
      }
      if (body._type === 'service') {
        triggerTag('services');
      }
    }

    if (Array.isArray(body?.tags)) {
      for (const tag of body.tags) {
        triggerTag(tag);
      }
    }

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      timestamp: Date.now(),
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
