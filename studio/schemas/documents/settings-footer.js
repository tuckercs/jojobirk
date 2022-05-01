export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',

  fields: [
    {
      title: 'Enable Footer?',
      name: 'enabled',
      type: 'boolean'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
}
