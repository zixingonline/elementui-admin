<template>
	<div class="wrap">
		<h1>This is Home Index.</h1>
		
		<editor :init="init" :initialValue="content" />
	</div>
</template>
<script>
	import Editor from '@tinymce/tinymce-vue'

	export default {
		data () {
			return {
				init: {
					height: 500,
					menubar: true,			// 显示工具栏上的导航栏
					branding: false,		// 隐藏右下角 powered by tiny
					draggable_modal: true,	// 模态框可拖动
					preview_styles:true,	// 设置预览
					statusbar: false,		// 底部状态栏
					skin: 'oxide-dark',
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar: [
						'undo redo | formatselect | fontsizeselect font_formats | forecolor backcolor | background bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | subscript superscript blockquote | removeformat Source code preview'
					],
				},
				content: '<p>21312321</p>',

			}
		},
		created () {
			
		},
		mounted () {
			console.log(Editor);
		},
		components: {
			'editor': Editor
		},
		watch: {
			value(newValue) {
				console.log(newValue);
				this.myValue = newValue
			},
			myValue(newValue) {
				this.$emit('input', newValue)
			}
		}
	}
</script>