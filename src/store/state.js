import utils from '@/static/js/utils';

const state = {
	sidebarCollapse: utils.getStorage('sidebarCollapse') == undefined ? 0 : utils.getStorage('sidebarCollapse'),
}

export default state;