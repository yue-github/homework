new Vue({
	el:"#homework",
	data:{
		imgFile:"",
		src:"",
		teacherID:"3545",
		student_id:"3550",
		kcID:0,
		msg:'',
		// 用于记录学生左侧点击的index
		class_index:0,
		// 点击老师页面发送时上传的相关信息属性相设置
		t_imgFile:"",
		t_src:"",
		t_teacherID:'3545',
		t_student_id:'3550',
		t_kcID:0,
		t_msg:'',


		// 发送的index数据
		arrIndex:{
			index_fir:0,
			index_sec:0,
			index_thir:0,
		},

		// 学生左侧数据
		student_list:[],
		// 学生左侧数据
		course_list:[
			{
				name:"",list:[
					{
						kecheng_name:""
					}
				]
			},

			{
				name:"",list:[
					{
						kecheng_name:""
					}
				]
			},
			{
				name:"",list:[
					{
						kecheng_name:""
					}
				]
			}
			,
		],status:0,
		// 老师页面左侧数据
		ls_list:[],
		//老师页面右侧数据
		teacher_list:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }


	},
	
	methods:{
		// 用于获取饿了么组件中的相关组件index
		// 
		// 
		// 以下数据有重复可优化
		// 
		// 
		handleNodeClick(obj,node,myselve){
		 	let vue=this;

		 	// 获取数据数结构index
		  	// console.log(obj,node,myselve
		  	let $treeNodeId;
		 	switch(node.level){
		 		case 1:
		 		// 用于获取联动一级的index;其中findIndex()函数属于es6+
		 		$treeNodeId=obj.$treeNodeId;
		 	    vue.arrIndex.index_fir=node.parent.data.findIndex((val,index,item)=>{
		 	    		// console.log(val.$treeNodeId)
		 			 	return val.$treeNodeId==$treeNodeId;
		 		})
		 		 
		 		
		 		break;

		 		case 2:
		 		 
		 		 // 用于获取联动二级的index;
		 		 
		 		$treeNodeId=obj.$treeNodeId;
		 		
		 	    vue.arrIndex.index_sec=node.parent.data.children.findIndex((val,index,item)=>{
		 	    		 
		 			 	return val.$treeNodeId==$treeNodeId;
		 		})
		 		 
		 		// 对要上传的index对象中一级联动index进行修正
		 		$treeNodeId=node.parent.data.$treeNodeId;
		 		// console.log(obj,node,myselve)
		 		// console.log($treeNodeId)
		 	    vue.arrIndex.index_fir=node.parent.parent.data.findIndex((val,index,item)=>{
		 	     
		 			 	return val.$treeNodeId==$treeNodeId;
		 		})

		 		break;

		 		case 3:
		 		// console.log(obj,node,myselve)
		 		$treeNodeId=obj.$treeNodeId;
		 	 
		 	    vue.arrIndex.index_thir=node.parent.data.children.findIndex((val,index,item)=>{
		 	    		// console.log(val.$treeNodeId)
		 			 	return val.$treeNodeId==$treeNodeId;
		 		})
		 		 
		 		// 对要上传的index对象中二级联动index进行修正
		 		$treeNodeId=node.parent.data.$treeNodeId;
		 		// console.log(node.parent.data)
		 	    vue.arrIndex.index_sec=node.parent.parent.data.children.findIndex((val,index,item)=>{
		 	    		// console.log(val.$treeNodeId)
		 			 	return val.$treeNodeId==$treeNodeId;
		 		})

		 	    // 对要上传的index对象中一级联动index进行修正
		 		$treeNodeId=node.parent.parent.data.$treeNodeId;
		 		// console.log(node.parent.data)
		 	    vue.arrIndex.index_fir=node.parent.parent.parent.data.findIndex((val,index,item)=>{
		 	    		// console.log(val.$treeNodeId)
		 			 	return val.$treeNodeId==$treeNodeId;
		 		})


				 // 在第三级联动点击时发动请求																											要上传的联动index
				 
				
				 

		 	    $.post("/homework/getkcfankui",{
					 kecheng_name:vue.ls_list[vue.arrIndex['index_fir']]['children'][vue.arrIndex['index_sec']]['label'],
					 student_name:vue.ls_list[vue.arrIndex['index_fir']]['children'][vue.arrIndex['index_sec']]['children'][vue.arrIndex['index_thir']]},function(res){
						if (res==-1) {
							vue.teacher_list = []
						}else{
							var ress =  JSON.parse(res)
							vue.t_kcID = ress.kc_id
							vue.t_teacherID = ress.teacher_id
							vue.t_student_id = ress.student_id
						 
							vue.teacher_list = ress.commont_list
							// mmmmm
							vue.toDingbu()
						}
		 		})
		 		break;
		 	   
		    }

		    console.log("老师页联动index,默认{0,0,0}",vue.arrIndex)

 
		 		 
 
		 },
		 toDingbu(){
			console.log($("#feed ul").height())
			this.$nextTick(()=>{
				if ($("#feed ul").height()) {
					$("#feed").scrollTop($("#feed ul").height());
				}else{
					$("#hehe").scrollTop($("#hehe ul").height());
				}
			})
		 },
	 	stu_fun(is_teacher){
	 		if(is_teacher=="0"){
	 			return true;
	 		}else{
	 			return false;
	 		}
	 		// is_teacher=="0"?return true:return false;
	 	 
	 	},
	 	tea_fun(is_teacher){
	 		if(is_teacher=="1"){
	 			return true;
	 		}else{
	 			return false;
	 		}
	 	},
	    // 点击学生的上传作业页面中的发送，而进行的数据交互
    	transmit() {
			if(this.kcID == ''){
				alert("先在左侧选择课程")
				return
			}
			if(this.msg == ''){
				alert("信息不能为空！")
				return
			}
    	let vue =this;
    	
    	// 隐藏图片显示块
    	document.getElementsByClassName("inSrcFir")[0].style.display="none";
    	let promise=new Promise((resolve,reject)=>{

 
		    		 let formData=new FormData();
		    		 if(!vue.imgFile){
		    		 	 resolve("")
		    		 	 return false;
		    		 }
		    		 // console.log(111) 
		    		 
		    		 formData.append("file",vue.imgFile);
		    		 // console.log(formData)
		    		 $.ajax({
		    		 	type:"POST",
		    		 	url:"/homework/uploadpic",
		    		 	data:formData,
		    		 	processData: false,  
		      			contentType: false,
		    		 	success:function(src){
		    		 		 resolve(src)
		    		 	}

		    		 })
		})
		// 异步加载，将图片url请求过来后再上传到以下地址服务器处理
		promise.then(url=>{
			// console.log(url)
			startWork(url)
		})
    	function startWork(url){
    		 // 获取节点-》图片预览的dom对象
    		 
			
			 $.post("/homework/sendwork",{
				kc_id:vue.kcID,
				teacher_id:vue.teacherID,
				pl_content:vue.msg,
				pl_images:url,
				is_teacher:0
			 },function(res){
			 	// 这边若能返回学生的id和老师的Id等就好了，不用再次请求数据以更新本地右面页面展示数据
				let obj=JSON.parse(res);
				// console.log(obj)
				if(obj.status=="1"){
					 // 点击时将input清空;
    					vue.msg="";
						vue.imgFile=""
					 // 用于再次请求刷新页面
					 vue.dianji(vue.class_index)
				}else{
					alert("发送失败");
				}
			 
			 })

		  }



		},



		// 点击学生上传作业中左侧中的导航栏而进行交互
		dianji(index) {
				 var that = this;
				  that.class_index=index;
				  for (let ind in this.$refs){
				  		 if(this.$refs[ind][0]){
				  		 	this.$refs[ind][0].style.background="";
				  		 }
				  }
				//   this.$refs[index][0].style.background="#F0F0F0"
				  that.teacherID=that.course_list[0].list[index].teacher_id;
				  that.kcID=that.course_list[0].list[index].kecheng_id;
				//   that.t_teacherID=that.course_list[0].list[index].teacher_id;
				//   that.t_kcID=that.course_list[0].list[index].kecheng_id;
				  if (that.t_kcID) {
					$.post("/homework/getkcfankui",{student_id:that.t_student_id,teacher_id:that.t_teacherID,kc_id:that.t_kcID},function(res){
						// console.log(JSON.parse(res))
						 
						that.teacher_list = JSON.parse(res) 
						that.toDingbu()
					})
				  }else{

					$.post("/homework/getkcfankui",{student_id:that.student_id,teacher_id:that.teacherID,kc_id:that.kcID},function(res){
						// console.log(JSON.parse(res))
						 
							that.student_list = JSON.parse(res)
							that.toDingbu()
					})
				  }

				 
			
			// 图片接口：/homework/uploadpic
		},
		// 点击老师反馈作业页面中的 发送 进行数据交互
		// 这个函数可优化，优化时与学生点击发送的函数
		teacherSend(){

			let vue =this;
			// 老师页面发送时input清空
			if(this.t_kcID == ''){
				alert("先在左侧选择课程")
				return
			}
			if(this.t_msg == ''){
				alert("信息不能为空！")
				return
			}
			document.getElementsByClassName("inSrcSec")[0].style.display="none";
	    	let promise=new Promise((resolve,reject)=>{

			    		  //    let time=new Date(),
			    			 // str_time=time.toLocaleString("chinese",{"hour12":false});
			    			 // console.log(typeof str_time)
			    	 
			    		 // this.$nextTick(function(){
			    		 // 	  $(".upload")[0].submit();
			    		 // })
			    		 // 没加图片就没必要发送请求了
			    		 let formData=new FormData();
			    		 if(!vue.imgFile){
			    		 	 resolve("")
			    		 	 return false;
			    		 }

			    		 formData.append("file",vue.imgFile);
			    		 // console.log(formData)
			    		 $.ajax({
			    		 	type:"POST",
			    		 	url:"/homework/uploadpic",
			    		 	data:formData,
			    		 	processData: false,  
			      			contentType: false,
			    		 	success:function(src){
								  resolve(src)
								  


			    		 	}


			    		 })
			})
			promise.then(url=>{
				// console.log(url)
				startWork(url)
			})

			// 函数重复可封装优化
	    	function startWork(url){

	    		 // 获取节点-》图片预览的dom对象
			  
	    	
			 // vue.t_msg=vue.$refs.teacher.value;
			 // console.log(vue.t_msg)
			//   教师发送
			 $.post("/homework/sendwork",{
				kc_id:vue.t_kcID,
				teacher_id:vue.t_teacherID,
				student_id:vue.t_student_id,
				pl_content:vue.t_msg,
				pl_images:url,
				is_teacher:1

			 },function(res){
				let obj=JSON.parse(res);
			 	
				if(obj.status=="1"){
					// 发送时图片块隐藏
					 vue.t_msg="";
					 vue.imgFile=""
					 
					 vue.dianji(vue.class_index)
				}else{
					alert("发送失败")
				}
			 })
		   }
		},
		loadImg(click){
			let  input;
			if(click=="is_stu"){
				input=this.$refs.inpFileFir;
			}else{
				input=this.$refs.inpFileSec;
			}
	  		
	  		this.imgFile=input.files[0];
	  		// console.log(this.imgFile)
	  		// console.log(input)
	  		this.changepic(input,click); 
	  	},
	  	//obj是指input对象
		changepic(obj,click) {
	        //这里可以获取上传文件的name

	          var newsrc=this.getObjectURL(obj.files[0]);
	          if(click=="is_tea"){
	          	    
	          	   let ims_sec=document.getElementsByClassName("inSrcSec")[0];
			           ims_sec.setAttribute("src",newsrc);
			           ims_sec.style.display="block";
	          }else{
	          	
	          	let ims=document.getElementsByClassName("inSrcFir")[0];
	              ims.setAttribute("src",newsrc);
	              ims.style.display="block";
	          } 

	          
	         
	          


	    },
	 
	    //建立一個可存取到該file的url
	  	 getObjectURL(file) {
	      if(!file){
	        return false;
	      }

	        var url = null ;
	        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
	        if (window.createObjectURL!=undefined) { // basic
	            url = window.createObjectURL(file) ;
	        } else if (window.URL!=undefined) { // mozilla(firefox)
	            url = window.URL.createObjectURL(file) ;
	        } else if (window.webkitURL!=undefined) { // webkit or chrome
	            url = window.webkitURL.createObjectURL(file) ;
	        }
	        return url ;
	    }
	  
	},
	mounted(){
		 	 
		
		var that = this;
		// 获取左侧学生的上传作业列表并进行数据赋值
		$.get("/homework/getkclist",function(res){
			// console.log(JSON.parse(res));
			that.course_list = JSON.parse(res);
		})
	 	// 获取左侧老师的反馈列表并进行数据赋值
		$.get("/homework/getlslist",function(res){
			 // console.log(JSON.parse(res))
			that.ls_list = JSON.parse(res)

		})
		// 默认页面展示
 	    // $.post("/homework/getkcfankui",{student_id:that.student_id,teacher_id:that.teacherID,kc_id:that.kcID}) 
 	    // .then(data=>{
 	    // 	// console.log(JSON.parse(data))
 	    // 	this.student_list = JSON.parse(data);
 	    // 	this.teacher_list = JSON.parse(data);
 	    // })
	    	
 	   	// $.post("/homework/uploadpic")
 	   	// .then(data=>{
 	   	// 	console.log(data)
 	   	// })
		  
	},



})



//老师页，学生页的局部跳转js
$('.fixed_box div').click(function(){
	$('.ye_box').removeClass('ye_box')
	$(this).addClass('ye_box')
	var menu_index = $(this).index()
	$('.homework').hide()
	$('.homework').eq(menu_index).show()
})
