<template>
    <div class="main">
        <!-- title -->
        <div class="title-desc">
            <div>
                <span>所属章节：</span>
                <span class="chapter-name">法律文书写作-</span>
                <span>第一章 法律文书的写作规范-</span>
                <span>1.1 法律文书概述</span>
            </div>
            <div>
                <el-button size="mini" type="primary">输入规范</el-button>
                <el-button size="mini" type="primary">输入范例</el-button>
                <el-button size="mini">下载模板</el-button>
            </div>
        </div>
        <!-- 内容 -->
        <div class="wrapper-box">
            <div class="input-area box">
                <!-- 1 -->
                <div class="input-type">
                    <span>
                        <span class="title">输入区</span>
                        <template>
                            <el-radio v-model="radio" v-for="item in inputType" :key="item.id" :label="item.id">{{ item.name
                            }}</el-radio>
                        </template>
                    </span>
                    <span>
                        <!-- <img class="question" src="../../assets/iamges/question.png" alt=""> -->
                        <div class="img"></div>
                        <span class="btn block">清空</span>
                    </span>
                </div>
                <!-- 2 -->
                <div class="select-type input-type">
                    <span class="title">知识点</span>
                    <template>
                        <el-checkbox-group v-model="radio">
                            <el-checkbox v-for="item in inputType" :key="item.id" :label="item.name">{{ item.name
                            }}</el-checkbox>
                            <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
                <!-- 3 -->
                <div class="question-area">
                    <div class="question" v-if="questionData">
                        {{ questionData }}
                    </div>
                    <div class="no-question" v-else>
                        请将所选试题复制到这里
                    </div>
                </div>
            </div>
            <div class="recognize-area box">
                <div class="input-type select-type">
                    <span class="title">识别区</span>
                    <span class="error">共2处错误，请参照输入范例修改</span>
                    <span class="btn">下一处</span>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="operate-area">
            <el-button size="mini">返回</el-button>
            <el-button size="mini" type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: '',
            inputType: [
                {
                    id: '',
                    name: '全部题型'
                },
                {
                    id: '1',
                    name: '单选题'
                },
                {
                    id: '2',
                    name: '多选题'
                },
                {
                    id: '3',
                    name: '判断题'
                }
            ],
            questionData: ''
        }
    }
}
</script>
<style>
.wrapper-box .el-radio__label,
.wrapper-box .el-checkbox__label {
    font-size: 12px;
}
</style>
<style lang="scss" scoped>
.main {
    padding: 20px 10px;

    .title-desc {
        margin-bottom: 10px;
        font-size: 12px;
        color: #999;
        display: flex;
        justify-content: space-between;

        .chapter-name {
            font-size: 14px;
            font-weight: 600;
            color: #000;
        }
    }

    .wrapper-box {
        display: flex;
        justify-content: space-between;


        .box {
            width: 700px;
            min-height: 700px;
            border: 1px solid rgba(228, 228, 228, 1);
        }

        .input-area {
            margin-right: 30px;
        }

        .input-type {
            padding: 10px 20px;
            background-color: rgba(242, 242, 242, 1);
            display: flex;
            justify-content: space-between;
            line-height: 20px;

            .question {
                width: 20px;
                height: 20px;
            }

            .title {
                margin-right: 20px;
                font-size: 14px;
                font-weight: 600;
            }

            .img {
                background-image: url("../../assets/iamges/question.png");
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 20px 20px;
                display: inline-block;
                width: 20px;
                height: 20px;
                cursor: pointer;

                &:hover {
                    background-image: url("../../assets/iamges/question_hover.png");
                }
            }

            .block {
                float: right;
                margin-left: 15px;
            }

            .btn {
                color: #169BD5;
                font-size: 12px;
                cursor: pointer;
            }
        }

        .select-type {
            display: flex;
            justify-content: flex-start;
            background-color: rgba(251, 251, 251, 1);
        }

        .error {
            font-size: 12px;
            color: #999;
            margin-right: 30px;
        }


        .question-area {
            padding: 30px 10px;
            color: #999;
            font-size: 12px;
        }
    }

    .operate-area {
        margin-top: 30px;
        text-align: center;
    }
}
</style>    