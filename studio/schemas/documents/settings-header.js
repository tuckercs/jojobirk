export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',

  fields: [
    {
      title: 'Enable Header?',
      name: 'enabled',
      type: 'boolean'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings'
      }
    }
  }
}
