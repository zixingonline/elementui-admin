const loginRule = {
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
	]
};

export {
	loginRule,
}