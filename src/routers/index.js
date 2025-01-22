import {createMemoryHistory, createRouter} from 'vue-router'

import MainComponent from "@/components/MainComponent.vue";
import AccountComponent from "@/components/AccountComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import ProjectPage from "@/components/ProjectPage.vue";
import AddProject from "@/components/AddProject.vue";
import HeaderLayout from "@/components/HeaderLayout.vue";

const routes = [
  {
    path:'/',
    name: 'head',
    component: HeaderLayout,
    children:[{
        path: '',
        name: 'main',
        component: MainComponent,
      },
      {
        path: 'acc',
        name: 'account',
        children: [{
          path: 'login',
          name: 'login',
          component: LoginComponent
        }, {
          path: 'reg',
          name: 'register',
          component: RegisterComponent
        },{
          path: 'homepage',
          name: 'homepage',
          component: AccountComponent
        },]
      },
      {
        path: 'addproject',
        name: 'addproject',
        component: AddProject
      },
      {
        path:'projectpage/:id',
        name: 'projectID',
        component: ProjectPage
      }
    ]
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router;
