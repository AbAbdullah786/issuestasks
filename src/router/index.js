import { createRouter, createWebHistory } from "vue-router";
import AuthComponent from "@/components/AuthComponent";
import SignUpComponent from "@/components/SignUpComponent";
import LoginComponent from "@/components/LoginComponent";
import HomeComponent from "@/components/HomeComponent";
import CallBackComponent from "@/components/CallBackComponent";
import ForgotComponent from "@/components/ForgotComponent";
import ResetPasswordComponent from "@/components/ResetPasswordComponent";
import AdminLayout from "@/components/AdminComponents/AdminLayout";
import AuthLayout from "@/components/AdminComponents/AuthLayout";
import IssuesIndex from "@/components/Pages/Issues/IssuesIndex";
import WorkSpaceGeneral from "@/components/Pages/WorkSpace/WorkSpaceGeneral";
import UserProfile from "@/components/Pages/Profile/UserProfile";
import UserPreference from "@/components/Pages/Profile/UserPreference";
import WorkSpaceMembers from "@/components/Pages/WorkSpace/WorkSpaceMembers";
import Teams from "@/components/Pages/Teams/Teams";
import AddTeam from "@/components/Pages/Teams/AddTeam";
import EditTeam from "@/components/Pages/Teams/EditTeam";
import TeamMembers from "@/components/Pages/Teams/TeamMembers";
import InviteMembers from "@/components/Pages/Teams/InviteMembers";
import Project from "@/components/Pages/Project/Project";
import EditProject from "@/components/Pages/Project/EditProject";
import NewIssueType from "@/components/Pages/Teams/NewIssueType";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: AuthLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "/auth/login",
          name: "Login",
          meta: { requiresAuth: false },
          component: LoginComponent,
        },
        {
          path: "/auth",
          name: "Auth",
          meta: { requiresAuth: false },
          component: AuthComponent,
        },
        {
          path: "/auth/signup",
          name: "SignUp",
          meta: { requiresAuth: false },
          component: SignUpComponent,
        },
        // {
        //     path: '/sidebar/styles',
        //     name: 'Styles',
        //     component: Style
        // },
        {
          path: "/auth/:name/callback",
          name: "CallBack",
          meta: { requiresAuth: false },
          component: CallBackComponent,
        },
        {
          path: "/auth/forgot-password",
          name: "ForgotPassword",
          meta: { requiresAuth: false },
          component: ForgotComponent,
        },
        {
          path: "/auth/password-recovery/:code",
          name: "ResetPassword",
          component: ResetPasswordComponent,
          meta: { requiresAuth: false },
          props: true,
        },
      ],
    },

    {
      path: "/",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          meta: { requiresAuth: true },
          component: HomeComponent,
        },
        {
          path: "issues",
          name: "IssuesIndex",
          meta: { requiresAuth: true },
          component: IssuesIndex,
        },
        {
          path: "user-profile",
          name: "UserProfile",
          meta: { requiresAuth: true },
          component: UserProfile,
        },
        {
          path: "workspace",
          name: "WorkSPace",
          meta: { requiresAuth: true },
          component: WorkSpaceGeneral,
        },
        {
          path: "user-preferences",
          name: "UserPreference",
          meta: { requiresAuth: true },
          component: UserPreference,
        },
        {
          path: "members",
          name: "WorkSpaceMembers",
          meta: { requiresAuth: true },
          component: WorkSpaceMembers,
        },
        {
          path: "teams",
          name: "Teams",
          meta: { requiresAuth: true },
          component: Teams,
        },
        {
          path: "add-team",
          name: "AddTeam",
          meta: { requiresAuth: true },
          component: AddTeam,
        },
        {
          path: "edit-team/:id",
          name: "EditTeam",
          meta: { requiresAuth: true },
          component: EditTeam,
        },
        {
          path: "team-members/:id",
          name: "TeamMembers",
          meta: { requiresAuth: true },
          component: TeamMembers,
        },
        {
          path: "invite-members",
          name: "InviteMembers",
          meta: { requiresAuth: true },
          component: InviteMembers,
        },
        {
          path: "teams/:id/projects",
          name: "Project",
          component: Project,
        },
        {
          path: "edit-project",
          name: "EditProject",
          component: EditProject,
        },
        {
          path: "/new-issue-type",
          name: "NewIssueType",
          component: NewIssueType
        }
        // {
        //     path: 'other',
        //     name: 'OtherInnerAppComponent',
        //     component: OtherInnerAppComponent
        // }
        // Other inner app routes...
      ],
    },
  ],
});

function checkAuthentication() {
  const token = localStorage.getItem("token");
  return !!token; // Example: Return true if a token exists, false otherwise
}

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (to.path === "/" && isAuthenticated) {
      // If user is logged in and hits '/', redirect to dashboard
      next("/dashboard");
    } else if (!isAuthenticated) {
      // If user is not logged in and hits any route other than '/login', redirect to login
      next("/auth/login");
    } else {
      // Continue with the navigation
      next();
    }
  } else {
    if (isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  }
});

export default router;
