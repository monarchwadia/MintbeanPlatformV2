import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VueConstructor } from 'vue/types/vue';

export default (Vue: VueConstructor<Vue>) => {
  library.add(fas)
  Vue.component('fa', FontAwesomeIcon);
}
