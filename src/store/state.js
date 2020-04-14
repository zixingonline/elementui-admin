const ls = window.localStorage;
const state = {
	sidebarCollapse: ls.getItem('sidebarCollapse') == undefined ? 0 : ls.getItem('sidebarCollapse'),
}

export default state;