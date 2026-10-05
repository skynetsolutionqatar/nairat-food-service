import type { StructureResolver } from 'sanity/structure';
import { apiVersion } from './env';

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
                .title('Our Products Page')
                .child(
                  S.document()
                    .schemaType('productsPage')
                    .documentId('productsPage-singleton')
                    .title('Our Products Page & Category Sections')
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
              S.listItem()
                .title('Produce Catalog by Category')
                .child(
                  S.list()
                    .title('Produce Categories')
                    .items([
                      S.listItem()
                        .title('All Produce Lines (34)')
                        .schemaType('product')
                        .child(S.documentTypeList('product').title('All Produce Lines (34)')),
                      S.divider(),
                      S.listItem()
                        .title('Fresh Vegetables (11)')
                        .schemaType('product')
                        .child(
                          S.documentList()
                            .title('Fresh Vegetables')
                            .apiVersion(apiVersion)
                            .filter('_type == "product" && category == "vegetables"')
                        ),
                      S.listItem()
                        .title('Fresh Fruits (8)')
                        .schemaType('product')
                        .child(
                          S.documentList()
                            .title('Fresh Fruits')
                            .apiVersion(apiVersion)
                            .filter('_type == "product" && category == "fruits"')
                        ),
                      S.listItem()
                        .title('Leafy & Herbs (8)')
                        .schemaType('product')
                        .child(
                          S.documentList()
                            .title('Leafy & Herbs')
                            .apiVersion(apiVersion)
                            .filter('_type == "product" && category == "leafy-herbs"')
                        ),
                      S.listItem()
                        .title('Specialty & Gourmet (7)')
                        .schemaType('product')
                        .child(
                          S.documentList()
                            .title('Specialty & Gourmet')
                            .apiVersion(apiVersion)
                            .filter('_type == "product" && category == "specialty-gourmet"')
                        ),
                    ])
                ),
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
