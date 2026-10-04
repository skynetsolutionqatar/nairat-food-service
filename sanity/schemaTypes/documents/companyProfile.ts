import { defineArrayMember, defineField, defineType } from 'sanity';

export const companyProfile = defineType({
  name: 'companyProfile',
  title: 'Company Profile & Institutional Facts',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Trade Name',
      type: 'string',
      initialValue: 'Nairat Food Services',
    }),
    defineField({
      name: 'legalName',
      title: 'Legal Entity Name',
      type: 'string',
      initialValue: 'Nairat Food Services W.L.L',
    }),
    defineField({
      name: 'establishedYear',
      title: 'Established Year',
      type: 'string',
      initialValue: '2020',
    }),
    defineField({
      name: 'productLinesCount',
      title: 'Product Lines Metric',
      type: 'string',
      initialValue: '1,200+',
      description: 'Official 2026 verified metric',
    }),
    defineField({
      name: 'dailyVolumeTonnes',
      title: 'Daily Volume (Tonnes)',
      type: 'string',
      initialValue: '~100 t',
    }),
    defineField({
      name: 'retailBranchesSupplied',
      title: 'Retail Outlets Supplied',
      type: 'string',
      initialValue: '100+',
    }),
    defineField({
      name: 'warehouseArea',
      title: 'Facility Area',
      type: 'string',
      initialValue: '5,000 m²',
    }),
    defineField({
      name: 'warehouseLocation',
      title: 'Facility Location',
      type: 'string',
      initialValue: 'Street 37, Industrial Area, Doha, Qatar',
    }),
    defineField({
      name: 'fleetVehiclesCount',
      title: 'Fleet Vehicles (GPS Controlled)',
      type: 'string',
      initialValue: '40',
    }),
    defineField({
      name: 'teamSize',
      title: 'Dedicated Team Size',
      type: 'string',
      initialValue: '200+',
    }),
    defineField({
      name: 'originCountriesCore',
      title: 'Core Origin Countries',
      type: 'string',
      initialValue: '15+',
    }),
    defineField({
      name: 'originCountriesGlobal',
      title: 'Global Sourcing Countries',
      type: 'string',
      initialValue: '60',
    }),
    defineField({
      name: 'certifications',
      title: 'Official Accreditations',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['HACCP', 'ISO 22000:2018'],
    }),
    defineField({
      name: 'certifiedScope',
      title: 'Certified Scope Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Central Phone',
      type: 'string',
      initialValue: '+974 4429 0400',
    }),
    defineField({
      name: 'email',
      title: 'Primary Corporate Email',
      type: 'string',
      initialValue: 'info@nairat.net',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'string',
      initialValue: 'Street 37, Industrial Area, Doha, Qatar',
    }),
    defineField({
      name: 'poBox',
      title: 'Postal Address',
      type: 'string',
      initialValue: 'P.O. Box 64040, Doha, Qatar',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'legalName',
    },
  },
});
