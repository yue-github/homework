<!--{template header}-->

<script type="text/javascript" src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js"></script> 
<link rel="stylesheet" type="text/css" href="/static/homework/css/homework.css">
<div class="container">
    <div id="homework" class="homework_box">
      
        <div  class="homework" style="display: block;">
            <div class="top_title">上传作业</div>
            <div v-if="course_list.status==0" style="width: 100%;text-align: center;margin-top: 20px;color: #666;">
                    您尚未报名任何机构的线下课程，或购买线上课程！
            </div>
            <div v-else class="content_box">
                <div class="left_content">
                    <ul class="ul_box">
                        <li class="li_index" v-for="course in course_list">
                            {{course.name}}
                            <ul>
                                <li @click="dianji(ind)" v-for="(info,ind) in course.list" class="child_li" v-bind:ref="ind">{{info.kecheng_name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="zhong_content">
                    <div class="name">反馈的列表</div>


                    <div class="feedback" id="hehe">
                        <ul class="feedback-ul">
                            <!-- 摁条件循环改变class样式 -->
                            <li :class="{student_comment:stu_fun(xs.is_teacher),teacher_comment:tea_fun(xs.is_teacher)}"
                                v-for="xs in student_list">
                                <div :class="{student_img:stu_fun(xs.is_teacher),teacher_img:tea_fun(xs.is_teacher)}"><img
                                        :src="stu_fun(xs.is_teacher)==true?xs.student_info.tximg:xs.teacher_info.tximg"></div>
                                <div :class="{student_type:stu_fun(xs.is_teacher),teacher_type:tea_fun(xs.is_teacher)}">
                                    <div :class="{student_name:stu_fun(xs.is_teacher),teacher_name:tea_fun(xs.is_teacher)}">{{stu_fun(xs.is_teacher)==true?xs.student_info.username:xs.teacher_info.username}}</div>
                                    <div class="time">{{xs.pl_time}}</div>
                                    <p class="title">{{xs.pl_content}}</p>
                                    <div class="zy_img" v-if="xs.pl_images">
                                    <a :href="xs.pl_images" target="_blank">  <img :src="xs.pl_images"></a>
                                    </div>
                                </div>
                            </li>

                        </ul>

                        <div class="exchange">
                            <form class="upload">
                                +

                                <input type="file" class="input-file" ref="inpFileFir" @change="loadImg('is_stu')"
                                accept=".jpg,.jpeg,.png">
                            </form>

                            <div class="input_box"><input v-model="msg" type="text" name="" placeholder="输入想问内容" @keyup.enter="transmit" ref="student"></div>
                            <div class="transmit" @click=transmit()>发送</div>

                            <img src="" class="inSrcFir" ref="inSrc">
                        </div>

                    </div>
                </div>
                <div class="right_content">
                    <div class="right_p">
                        <p class="prompt">提示</p>
                        <p>为保证老师反馈的质量，每日每科限定提交一次作业</p>
                    </div>
                    <div class="click_box"  @click="alert('一分耕耘一分收获')"><img src="/static/homework/img/dz.png">
                    </div>
                    <div class="click_p">
                        <p>给老师点个赞把！</p>
                    </div>

                </div>
            </div>

        </div>
    </div>
    <script type="text/javascript" src="/static/homework/js/homework.js"></script>
</div>


<!--{template footer }-->