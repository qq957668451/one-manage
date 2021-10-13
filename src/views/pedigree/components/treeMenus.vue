<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div :style="{borderLeft:(list.length===(index+1))?'none':'1px solid',display:'flex',paddingTop:(list.length===(index+1))?'none':'00px'}">
        <!-- 折叠或展开 -->
        <div>
          <div class="folding-icon" :class="(list.length===(index+1)) && index===0 ?'':(list.length===(index+1))?'not-left-bottom':'line-left'"
            style="display:inline-block" />
          <span style="font-size:20px">
            <i v-if="item.children.length>0" style="cursor:pointer" :class="item.showChildren?'el-icon-remove-outline':'el-icon-circle-plus-outline'"
              @click="item.showChildren=!item.showChildren" />
            <span v-else class="cantUnfold" />
          </span>
        </div>
        <div :style="{paddingTop:(list.length===(index+1)) && index===0 ?'2px':(list.length===(index+1))?'8px':'3px'}">
          <div style="display:flex;align-items:center;height:30px">
            <person-icon :item="item" />
            <!-- 新增孩子输入 -->
            <el-input v-if="item.isToaddChildren && !inputChildrenStatus" ref="saveChildrenInput" v-model="inputChild" class="input-new-tag"
              size="small" @keyup.enter.native="handleInputChildren(item,index)" @blur="handleInputChildren(item,index)" />
            <!-- 新增兄妹输入 -->
            <el-input v-else-if="item.isToaddBrother && !inputBrotherStatus" ref="saveBrotherInput" v-model="inputBrother" class="input-new-tag"
              size="small" @keyup.enter.native="handleInputBrother(item,index)" @blur="handleInputBrother(item,index)" />
            <div v-else class="person-name" :style="{background:item.isSelected?'#f86e04':'#f2f2f2'}" @click="nameClick(item,1)">
              {{ item.familyName }}{{ item.name }}</div>
            <!-- 删除新增孩子 -->
            <i v-if="item.canDeleteChildren" class="el-icon-delete" @click="deleteNewChildren(index)" />
            <!-- 删除新增兄妹 -->
            <i v-if="item.canDeleteBrother" class="el-icon-delete" @click="deleteNewBrother(index)" />
            <span>[{{ item.identity }}]</span>
            <span>[{{ item.generations }}世]</span>
            <!-- 配偶信息 -->
            <span v-if="item.spouse.length > 0" style="display:flex;align-items:center">
              <span v-for="(spouseItem, spouseIndex) in item.spouse" :key="spouseIndex" style="display:flex;align-items:center">
                <person-icon :item="spouseItem" />
                <el-input v-if="inputSpouseStatus && spouseItem.isToAddSpouse" ref="saveTagInput" v-model="inputSpouse" class="input-new-tag"
                  size="small" @keyup.enter.native="handleInputSpouse(spouseItem,spouseIndex,item)"
                  @blur="handleInputSpouse(spouseItem,spouseIndex,item)" />
                <span v-else class="person-name" :style="{background:spouseItem.isSelected?'#f86e04':'#f2f2f2'}"
                  @click="nameClick(item,2,spouseIndex)">{{ spouseItem.name }}</span>
                <!-- 删除配偶 -->
                <i v-if="spouseItem.canDeleteSpouse" class="el-icon-delete" @click="deleteNewSpouse(item,spouseIndex)" />
              </span>
              <el-button v-if="item.toAddSpouse" class="button-new-tag" size="small" @click="showSpouseInput(item)">+添加配偶
              </el-button>
            </span>
          </div>

          <div v-show="item.showChildren" style="margin-left: 25px;">
            <tree-menus v-if="item.children.length>0" :list="item.children" />
          </div>
          <div v-if="item.toAddChildren || item.toAddBrother" class="childAndBrother">
            <!-- 新增孩子 -->
            <div v-if="item.toAddChildren" class="more-child">
              <div>
                <div style="height:15px" />
                <div style="display:flex;align-items:center">
                  <person-icon :item="{sex:'man',isAlive:true}" />
                  <el-button class="button-new-tag" size="mini" @click="showChildrenInput(item)">添加孩子</el-button>
                </div>

              </div>
            </div>
            <!-- 新增兄妹 -->
            <div v-if="item.toAddBrother" class="more-child more-brother">
              <div>
                <div style="height:20px" />
                <div class="brotherLine" style="display:flex;align-items:center">
                  <person-icon :item="{sex:'man',isAlive:true}" />
                  <el-button class="button-new-tag" size="mini" @click="showBrotherInput(item)">添加兄妹</el-button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import personIcon from './PersonIcon'
export default {
  name: 'TreeMenus',
  components: {
    personIcon
  },
  props: {
    list: Array
  },
  data() {
    return {
      inputSpouseStatus: false, // 添加配偶输入框状态
      inputChildrenStatus: false, // 添加孩子输入框状态
      inputBrotherStatus: false, // 添加兄妹输入框状态
      inputSpouse: '', // 新增配偶名
      checkedItem: {}, // 选中的人
      inputChild: '', // 新增孩子名
      inputBrother: '', // 新增兄妹名
      broParent: {} // 新增兄妹的父元素
    }
  },
  watch: {
    // inputChildrenStatus(value, old) {
    //   if (value) {
    //     this.inputChild = "杨";
    //   }
    // },
  },
  mounted() {},
  methods: {
    // 点击人名
    nameClick(item, type, spouseIndex) {
      console.log('item', item)
      console.log('type', type)
      console.log('spouseIndex', spouseIndex)
      if (!item.id) return
      this.$bus.$emit('checkedName', item, type, spouseIndex)
      this.checkedItem = item
    },
    // 新增配偶按钮
    showSpouseInput(item) {
      this.inputSpouseStatus = true
      this.$nextTick((_) => {
        this.$bus.$emit('checkedName', item, 1)
        // 新增配偶
        this.$bus.$emit('toAddSpouse', item)
        setTimeout(() => {
          this.$refs.saveTagInput[0].$refs.input.focus()
          this.inputSpouse = ''
        })
      })
    },
    // 新增孩子按钮
    showChildrenInput(item) {
      this.inputChildrenStatus = true
      this.$nextTick((_) => {
        this.$bus.$emit('toAddChildren', item)
        setTimeout(() => {
          this.$children.map((mapItem, index) => {
            if (
              mapItem.$refs.saveChildrenInput &&
              mapItem.$refs.saveChildrenInput.length > 0
            ) {
              mapItem.$refs.saveChildrenInput[0].$refs.input.focus()
              mapItem.inputChild = item.familyName
            }
          })
        })
      })
    },
    // 新增兄妹按钮
    showBrotherInput(item) {
      this.$vnode.context.list.map((a, b) => {
        a.children.map((m, n) => {
          if (m.id === this.checkedItem.id) {
            this.broParent = a
            this.$bus.$emit('toAddBrother', a)
            setTimeout(() => {
              this.$refs.saveBrotherInput[0].$refs.input.focus()
              this.inputBrother = a.familyName
            })
          }
        })
      })
    },
    // 输入孩子名后保存
    handleInputChildren(item, index) {
      if (this.inputChild) {
        item.isToaddChildren = false
        item.canDeleteChildren = true
        item.name = this.inputChild.substring(1)
        item.familyName = this.inputChild.substring(0, 1)
      } else if (item.isToaddChildren) {
        this.deleteNewChildren(index)
      }
    },
    // 输入兄妹名后保存
    handleInputBrother(item, index) {
      console.log('item', item)
      if (this.inputBrother) {
        item.isToaddBrother = false
        item.canDeleteBrother = true
        item.name = this.inputBrother.substring(1)
        item.familyName = this.inputBrother.substring(0, 1)
      } else if (item.isToaddBrother) {
        this.deleteNewBrother(index)
      }
    },
    // 输入配偶名后保存
    handleInputSpouse(item, index, parentItem) {
      if (this.inputSpouse) {
        item.isToAddSpouse = false
        item.canDeleteSpouse = true
        item.name = this.inputSpouse
      } else {
        this.deleteNewSpouse(parentItem, index)
      }
    },
    // 删除配偶
    deleteNewSpouse(item, spouseIndex) {
      this.$bus.$emit('deleteSpouse', item, spouseIndex)
    },
    // 删除孩子
    deleteNewChildren(index) {
      this.$bus.$emit('deleteChildren', this.$vnode.context.checkedItem, index)
    },
    // 删除兄妹
    deleteNewBrother(index) {
      this.$bus.$emit('deleteBrother', this.broParent, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.person-name {
  background: #f2f2f2;
  margin-right: 4px;
  line-height: 26px;
  cursor: pointer;
  padding: 2px 10px;
  white-space: nowrap;
  border-radius: 2px;
  min-width: 60px;
}
.cantUnfold {
  display: inline-block;
  height: 18px;
  border-bottom: 1px solid;
  margin-bottom: 7px;
  width: 20px;
  position: relative;
  right: 5px;
  cursor: default;
}
.line-left {
  width: 15px;
  height: 20px;
  flex-shrink: 0;
  &::before {
    content: '';
    display: block;
    height: 13px;
    border-bottom: 1px solid;
  }
}
.not-left-bottom {
  width: 15px;
  height: 20px;
  flex-shrink: 0;
  &::before {
    content: '';
    display: block;
    height: 18px;
    border-bottom: 1px solid;
    border-left: 1px solid;
    position: relative;
    bottom: 5px;
  }
}
.childAndBrother {
  .more-child {
    padding-left: 25px;
    display: flex;
    color: #c4dbf5;
    // cursor: pointer;
    &::before {
      content: '';
      display: block;
      width: 30px;
      height: 33px;
      border-left: 1px dashed #c4dbf5;
      border-bottom: 1px dashed #c4dbf5;
      margin-right: 5px;
    }
  }
  .more-brother {
    // width: 0;
    // height: 30px;
    // margin: 0;
    // transform: translateY(-13px);
    &::before {
      width: 0;
      height: 30px;
      margin: 0;
      transform: translateY(-13px);
    }
    .brotherLine {
      display: flex;
      align-items: center;
      position: relative;
      right: 11px;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-icon-delete {
  cursor: pointer;
}
</style>
