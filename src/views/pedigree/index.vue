<template>
  <div>
    <div>
      <my-trees :list="list"></my-trees>
    </div>
  </div>
</template>

<script>
import myTrees from './components/treeMenus'
export default {
  name: 'pedigree',
  components: {
    myTrees
  },
  data() {
    return {
      list: [
        {
          showChildren: true,
          sex: 'man',
          familyName: '杨',
          name: '聚元',
          isAlive: false,
          isSelected: false,
          id: '10001',
          spouse: [
            { name: '陈氏', isAlive: false, isSelected: false, sex: 'woman' },
            { name: '赵氏', isAlive: false, isSelected: false, sex: 'woman' }
          ],
          generations: '13',
          identity: '始祖',
          children: [
            {
              showChildren: true,
              sex: 'man',
              familyName: '杨',
              name: '裕丰',
              isAlive: false,
              isSelected: false,
              id: '10002',
              spouse: [
                {
                  name: '陈氏',
                  isAlive: false,
                  isSelected: false,
                  sex: 'woman'
                }
              ],
              generations: '14',
              identity: '长子',
              children: [
                {
                  showChildren: true,
                  sex: 'man',
                  familyName: '杨',
                  name: '浩文',
                  isAlive: false,
                  isSelected: false,
                  id: '10003',
                  spouse: [
                    {
                      name: '陈氏',
                      isAlive: false,
                      isSelected: false,
                      sex: 'woman'
                    }
                  ],
                  generations: '15',
                  identity: '长子',
                  children: [
                    {
                      showChildren: true,
                      sex: 'man',
                      familyName: '杨',
                      name: '金波',
                      isAlive: true,
                      isSelected: false,
                      id: '10004',
                      spouse: [
                        {
                          name: '陈氏',
                          isAlive: false,
                          isSelected: false,
                          sex: 'woman'
                        }
                      ],
                      generations: '16',
                      identity: '长子',
                      children: []
                    },
                    {
                      showChildren: true,
                      sex: 'man',
                      familyName: '杨',
                      name: '银波',
                      isAlive: true,
                      isSelected: false,
                      id: '10005',
                      spouse: [
                        {
                          name: '陈氏',
                          isAlive: false,
                          isSelected: false,
                          sex: 'woman'
                        }
                      ],
                      generations: '16',
                      identity: '次子',
                      children: []
                    },
                    {
                      showChildren: true,
                      sex: 'man',
                      familyName: '杨',
                      name: '铜波',
                      isAlive: true,
                      isSelected: false,
                      id: '10006',
                      spouse: [
                        {
                          name: '陈氏',
                          isAlive: false,
                          isSelected: false,
                          sex: 'woman'
                        }
                      ],
                      generations: '16',
                      identity: '三子',
                      children: []
                    }
                  ]
                },
                {
                  showChildren: true,
                  sex: 'woman',
                  familyName: '杨',
                  name: '杰文',
                  isAlive: true,
                  isSelected: false,
                  id: '10007',
                  spouse: [
                    {
                      name: '张氏',
                      isAlive: true,
                      isSelected: false,
                      sex: 'man'
                    }
                  ],
                  generations: '15',
                  identity: '长女',
                  children: []
                }
              ]
            },
            {
              showChildren: true,
              sex: 'man',
              familyName: '杨',
              name: '裕龙',
              isAlive: true,
              isSelected: false,
              id: '10008',
              spouse: [
                {
                  name: '陈氏',
                  isAlive: true,
                  isSelected: false,
                  sex: 'woman'
                }
              ],
              generations: '14',
              identity: '次子',
              children: []
            }
          ]
        }
      ]
    }
  },
  mounted() {
    // 点击选中人
    this.$bus.$on('checkedName', (item, type, spouseIndex) => {
      this.getCheckedName(type, this.list, item.id, spouseIndex)
    })
    // 点击添加配偶
    this.$bus.$on('toAddSpouse', (item) => {
      console.log('item', item)
      item.spouse.push({
        name: '',
        isAlive: false,
        isSelected: false,
        sex: 'woman',
        isToAddSpouse: true
      })
    })
    // 点击添加孩子
    this.$bus.$on('toAddChildren', (item) => {
      this.getAddChildren(this.list, item.id)
    })
    // 点击添加兄妹
    this.$bus.$on('toAddBrother', (item) => {
      item.children.push({
        isToaddBrother: true,
        showChildren: true,
        sex: 'man',
        familyName: '杨',
        name: '',
        isAlive: true,
        isSelected: false,
        id: '',
        generations: Number(item.generations) + 1,
        // identity: "次子",
        children: [],
        spouse: []
      })
    })
    // 删除新增配偶
    this.$bus.$on('deleteSpouse', (item, spouseIndex) => {
      this.deleteSpouse(this.list, item.id, spouseIndex)
    })
    // 删除新增孩子
    this.$bus.$on('deleteChildren', (item, index) => {
      this.deleteChildren(this.list, item.id, index)
    })
    // 删除新增兄妹
    this.$bus.$on('deleteBrother', (item, index) => {
      this.deleteBrother(this.list, item.id, index)
    })
  },
  methods: {
    // 删除新增配偶
    deleteSpouse(list, id, spouseIndex) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i].spouse.splice(spouseIndex, 1)
          return
        }
        this.deleteSpouse(list[i].children, id, spouseIndex)
      }
    },
    // 删除新增孩子
    deleteChildren(list, id, index) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i].children.splice(index, 1)
          return
        }
        this.deleteChildren(list[i].children, id, index)
      }
    },
    // 删除新增兄妹
    deleteBrother(list, id, index) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i].children.splice(index, 1)
          return
        }
        this.deleteBrother(list[i].children, id, index)
      }
    },

    // 新增兄妹
    getAddBrother(list, id) {
      console.log('list', list)
      console.log('id', id)
    },
    // 新增孩子
    getAddChildren(list, id) {
      if (list && list.length > 0) {
        list.map((item, index) => {
          if (item.id === id) {
            item.children.push({
              isToaddChildren: true,
              showChildren: true,
              sex: 'man',
              familyName: '杨',
              name: '',
              isAlive: true,
              isSelected: false,
              id: '',
              generations: Number(item.generations) + 1,
              // identity: "次子",
              children: [],
              spouse: []
            })
            return
          }
          this.getAddChildren(item.children, id)
        })
      } else {
        return
      }
    },
    // 查找人，设置选中状态，显示输入按钮
    getCheckedName(type, list, id, spouseIndex) {
      if (list && list.length > 0) {
        list.map((item, index) => {
          item.spouseChecked = false
          item.spouse.map((innerItem, innerIndex) => {
            if (item.id === id && type === 1) {
              // 族人选中
              item.isSelected = true
              // 显示配偶输入按钮
              item.spouseChecked = true
            } else {
              item.isSelected = false
            }
            if (type === 2 && item.id === id && innerIndex === spouseIndex) {
              // 配偶选中
              innerItem.isSelected = true
              // 显示配偶输入按钮
              item.spouseChecked = true
            } else {
              innerItem.isSelected = false
            }
            // 显示子女、兄弟添加按钮
            if (item.id === id && type === 1) {
              item.toAddChildren = true
              item.toAddBrother = true
              item.toAddSpouse = true
            } else if (item.id === id && type === 2) {
              item.toAddChildren = true
              item.toAddBrother = false
              item.toAddSpouse = true
            } else {
              item.toAddChildren = false
              item.toAddBrother = false
              item.toAddSpouse = false
            }
          })
          this.getCheckedName(type, item.children, id, spouseIndex)
        })
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.change-log-container {
  margin: 30px;

  .log-box {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;

    .log-header {
      border-bottom: 1px solid #ddd;
      padding: 10px 10px 15px;
      margin-bottom: 15px;

      .version {
        font-size: 20px;
        font-weight: 700;
        color: 333;
      }

      .commit {
        font-size: 12px;
        color: #666;
        margin-left: 15px;
      }

      .date {
        float: right;
      }
    }

    .text-box {
      margin-left: 30px;
      margin-bottom: 15px;
      line-height: 24px;
      font-size: 16px;
      color: #555;

      .log--title {
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        color: #1f2f3d;
        margin-left: -15px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
