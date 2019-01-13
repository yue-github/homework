<!--{template header}-->

	<script type="text/javascript" src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js"></script>
	
	<link rel="stylesheet" href="/static/js/element-ui.min.css">
	<!-- 引入组件库 -->
<script src="/static/js/element-ui.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/static/homework/css/homework.css">
<div class="container">
	<div id="homework" class="homework_box">
		 
		<div class="homework" style="display:block">
			<div class="top_title">反馈作业</div>
			<div class="content_box">
				<div class="left_content">
					<div class="el_tree">
						<el-tree :data="ls_list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
					</div>
				</div>
				<div class="zhong_content">
					<div class="name">反馈的列表</div>
					<div class="feedback" ref="feedback" id="feed">
						<ul>
						<!-- 摁条件循环改变class样式 -->
							<li :class="{student_comment:stu_fun(xs.is_teacher),teacher_comment:tea_fun(xs.is_teacher)}" v-for="xs in teacher_list">
								<div :class="{student_img:stu_fun(xs.is_teacher),teacher_img:tea_fun(xs.is_teacher)}"><img :src="stu_fun(xs.is_teacher)==true?xs.student_info.tximg:xs.teacher_info.tximg"></div>
								<div :class="{student_type:stu_fun(xs.is_teacher),teacher_type:tea_fun(xs.is_teacher)}">
									<div :class="{student_name:stu_fun(xs.is_teacher),teacher_name:tea_fun(xs.is_teacher)}">{{stu_fun(xs.is_teacher)==true?xs.student_info.username:xs.teacher_info.username}}</div>
									<div class="time">{{xs.pl_time}}</div>
									<p class="title">{{xs.pl_content}}</p>
									<div class="zy_img" v-if="xs.pl_images">
									<a :href="xs.pl_images" target="_blank"> <img :src="xs.pl_images"> </a></div>
								</div>
							</li>
						 
							
						</ul>

						<div class="exchange" ref="exUl">
							<div class="upload">
									 +
									 <!-- loadImg参数用于判断是点击学生还是老师 -->
									 <input type="file" class="input-file-sec" ref="inpFileSec" @change="loadImg('is_tea')"  accept=".jpg,.jpeg,.png">
							 </div>
							<div class="input_box"><input type="text" name=""  ref="teacher" v-model="t_msg"  @keyup.enter="teacherSend()"></div>
							<div class="transmit" @click="teacherSend()">发送</div>
							<img src="" class="inSrcSec" ref="inSrcSec">
						</div>
						
					</div>
				</div>
				<div class="right_content">
					<div class="right_p">
						<p class="prompt">提示</p>
						<p class="prompt_title">1. 为保证反馈的质量，每生每科限定提交一次作业反馈，请教师认真阅读学生的试题和答案</p>
						<p class="prompt_title">2. 老师收到学生的作业，下载后，可用电脑的画板或手机的涂鸦编辑功能，打√打×或标记，并对错误之处附上文字描述</p>
					</div>
				</div>
			</div>
			
		</div> 
	</div>
	<script type="text/javascript" src="/static/homework/js/homework.js"></script>
</div>


<!--{template footer }-->