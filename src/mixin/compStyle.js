export default {
  computed: {
    compStyle() {
      if (this.itemDef && this.itemDef.style) {
        const style = this.itemDef.style
        let styleObj = {
          margin: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,
          'border-width': style.borderWidth,
          'border-color': style.borderColor || 'transparent',
          'box-shadow': `${style.boxShadowColor} ${style.boxShadow}`,
          'background-color': style.backgroundColor,
          'border-radius': style.borderRadius + 'px'
        }
        return styleObj
      }
      return {}
    },
  },
  mounted() {
    console.log('mixin')
  }
}