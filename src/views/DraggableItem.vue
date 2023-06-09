<script>
import draggable from 'vuedraggable'
import render from '@/components/render/render'

const components = {
  itemBtns(h, currentItem, index, list) {
    const {  upItem, downItem, copyItem, deleteItem } = this.$listeners
    return [
      <div class="operator-btns">
        { index > 0 ?
          <span class="drawing-item-up" title="上移"  onClick={event => {
            upItem(index, list); event.stopPropagation()
          }}>
            <i class="el-icon-top" />
          </span> : ''
        }
        {
          index < (list.length - 1) ?
          <span class="drawing-item-down" title="下移" onClick={event => {
            downItem( index, list); event.stopPropagation()
          }}>
            <i class="el-icon-bottom" />
          </span>:''
        }
        <span class="drawing-item-copy" title="复制" onClick={event => {
          copyItem(currentItem, list); event.stopPropagation()
        }}>
          <i class="el-icon-copy-document" />
        </span>
        <span class="drawing-item-delete" title="删除" onClick={event => {
          deleteItem(index, list); event.stopPropagation()
        }}>
          <i class="el-icon-delete" />
        </span>
      </div>
    ]
  }
}
const layouts = {
  colFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__
    if(!config)return
    const child = renderChildren.apply(this, arguments)
    let className = this.activeId === config.formId ? 'drawing-item active-form-item' : 'drawing-item'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span} class={className}
        nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
       
          <render key={config.renderKey} conf={currentItem} onInput={ event => {
            this.$set(config, 'defaultValue', event)
          }}>
            {child}
          </render>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__
    const className = this.activeId === config.formId
      ? 'drawing-row-item active-form-item'
      : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (currentItem.type === 'flex') {
      child = <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
              {child}
            </el-row>
    }
    return (
      <el-col span={config.span}>
        <el-row gutter={currentItem.gutter} class={className}
          nativeOnClick={event => { activeItem(currentItem,index,list); event.stopPropagation() }}>
          <span class="component-name">{config.title}</span>
          <draggable list={config.params || []} animation={340}
            group="componentsGroup" class={"drag-wrapper " + config.mode}>
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.__config__
    const child = renderChildren.apply(this, arguments)
    return <render key={config.renderKey} conf={currentItem} onInput={ event => {
      this.$set(config, 'defaultValue', event)
    }}>
      {child}
    </render>
  }
}

function renderChildren(h, currentItem, index, list) {
  const config = currentItem.__config__
  if (!config||!Array.isArray(config.params)) return null
  return config.params.map((el, i) => {
    const layout = layouts[el.layout?el.layout:'colFormItem']
    if (layout) {
      return layout.call(this, h, el, i, config.params)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.currentItem.layout}匹配的layout`)
}

export default {
  components: {
    render,
    draggable,
  },
  props: [
    'currentItem',
    'index',
    'drawingList',
    'activeId',
    'formConf',
  ],
  render(h) {
    const layout = layouts[this.currentItem.layout?this.currentItem.layout:'colFormItem']
    
    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
