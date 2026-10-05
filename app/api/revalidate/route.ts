import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import crypto from 'node:crypto';

interface WebhookPayload {
  _type?: string;
  tags?: string[];
}

function timingSafeMatch(a: string | null, b: string): boolean {
  if (!a) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret || secret.trim() === '') {
      console.error('⚠️ [Revalidate] SANITY_REVALIDATE_SECRET is unconfigured on server.');
      return new Response('Revalidation secret is not configured on server', { status: 500 });
    }

    const hasSignature = Boolean(req.headers.get('sanity-webhook-signature'));

    let body: WebhookPayload | null = null;

    if (hasSignature) {
      const { isValidSignature, body: parsedBody } = await parseBody<WebhookPayload>(
        req,
        secret
      );
      if (!isValidSignature) {
        return new Response('Invalid signature', { status: 401 });
      }
      body = parsedBody;
    } else {
      // Direct call (manual revalidation or developer test)
      const tokenHeader = req.headers.get('x-revalidate-secret');
      const tokenQuery = req.nextUrl.searchParams.get('secret');
      const authorized = timingSafeMatch(tokenHeader, secret) || timingSafeMatch(tokenQuery, secret);
      if (!authorized) {
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
      if (body._type === 'homePage') {
        triggerTag('homePage');
      }
      if (body._type === 'companyPage') {
        triggerTag('companyPage');
      }
      if (body._type === 'qualityPage') {
        triggerTag('qualityPage');
      }
      if (body._type === 'servicesPage') {
        triggerTag('servicesPage');
      }
      if (body._type === 'partnersPage') {
        triggerTag('partnersPage');
      }
      if (body._type === 'contactPage') {
        triggerTag('contactPage');
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
    console.error('❌ Failed to process cache revalidation:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
