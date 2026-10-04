import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Nairat Food Services CMS')
    .items([
      // 1. Pages (Section-Wise Content)
      S.listItem()
        .title('Pages & Section Content')
        .child(
          S.list()
            .title('Pages & Section Content')
            .items([
              S.listItem()
                .title('Home Page')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage-singleton')
                    .title('Home Page Sections')
                ),
              S.listItem()
                .title('Company Page')
                .child(
                  S.document()
                    .schemaType('companyPage')
                    .documentId('companyPage-singleton')
                    .title('Company Page Sections')
                ),
              S.listItem()
                .title('Sourcing & Quality Page')
                .child(
                  S.document()
                    .schemaType('qualityPage')
                    .documentId('qualityPage-singleton')
                    .title('Sourcing & Quality Sections')
                ),
              S.listItem()
                .title('Services Page')
                .child(
                  S.document()
                    .schemaType('servicesPage')
                    .documentId('servicesPage-singleton')
                    .title('Services Page Sections')
                ),
              S.listItem()
                .title('Partners Page')
                .child(
                  S.document()
                    .schemaType('partnersPage')
                    .documentId('partnersPage-singleton')
                    .title('Partners Page Sections')
                ),
              S.listItem()
                .title('Contact Us Page')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage-singleton')
                    .title('Contact Us Page Sections')
                ),
            ])
        ),

      S.divider(),

      // 2. Catalogs & Collections
      S.listItem()
        .title('Catalogs & Collections')
        .child(
          S.list()
            .title('Catalogs & Collections')
            .items([
              S.documentTypeListItem('product').title('Produce Lines (34)'),
              S.documentTypeListItem('partner').title('Partners & Clients (10)'),
              S.documentTypeListItem('service').title('Commercial Services (6)'),
              S.documentTypeListItem('qualityCert').title('Quality Accreditations (2)'),
            ])
        ),

      S.divider(),

      // 3. Master Corporate Information
      S.listItem()
        .title('Company Profile & Metrics')
        .child(
          S.document()
            .schemaType('companyProfile')
            .documentId('companyProfile-singleton')
            .title('Corporate Profile & Metrics')
        ),
    ]);
