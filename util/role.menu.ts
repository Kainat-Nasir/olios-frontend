import { WebConstants } from 'src/app/util/web.constants';
export const RoleMenu = [
    {
        ROLE_SUPER_ADMIN: [
            {id: '2', name: WebConstants.MENU_NAMES.ORGANIZATION, cssClass:'fa fa-sitemap', href: '/organization'},
            {id: '8', name: WebConstants.MENU_NAMES.USER, cssClass:'fa fa-user', href: '/user'},
            {id: '9', name: WebConstants.MENU_NAMES.SHIFT_CHART, cssClass:'fas fa-chart-line', href: '/chart-shift-details'},
            {id: '10', name: WebConstants.MENU_NAMES.SHIFT_CHART_DAILY, cssClass:'fas fa-chart-bar', href: '/chart-daily-shift-details'},
            {id:'12', name: WebConstants.MENU_NAMES.LICENSE_MANAGEMENT,cssClass:'fa fa-id-card' ,href:'/license-management'}
        ],
        ROLE_ADMIN_ORGANIZATION: [
            {id: '11', name: WebConstants.MENU_NAMES.DASHBOARD, cssClass:'fa-tachometer-alt fas', href: '/dashboard-organization'},
            {id: '4', name: WebConstants.MENU_NAMES.REGISTERED_VEHICLE, cssClass:'fa fa-th-list', href: 'lpr-config/registered-vehicle'},
            {id: '5', name: WebConstants.MENU_NAMES.SHIFT_DETAIL, cssClass:'fa fa-exclamation-triangle', href: 'shift-details'},
            {id: '6', name: WebConstants.MENU_NAMES.CAMERA_GROUP, cssClass:'fa fa-object-group', href: 'lpr-config/camera-group'},
            {id: '7', name: WebConstants.MENU_NAMES.CAMERA_LIST, cssClass:'fa fa-camera', href: 'lpr-config/camera-list'},
            {id: '8', name: WebConstants.MENU_NAMES.USER, cssClass:'fa fa-user', href: '/user'}
        ],
        ROLE_MANAGER:[
            {id: '4', name: WebConstants.MENU_NAMES.REGISTERED_VEHICLE, cssClass:'fa fa-th-list', href: 'lpr-config/registered-vehicle'},
            {id: '5', name: WebConstants.MENU_NAMES.SHIFT_DETAIL, cssClass:'fa fa-exclamation-triangle', href: 'shift-details'},
            {id: '6', name: WebConstants.MENU_NAMES.CAMERA_GROUP, cssClass:'fa fa-object-group', href: 'lpr-config/camera-group'},
            {id: '7', name: WebConstants.MENU_NAMES.CAMERA_LIST, cssClass:'fa fa-camera', href: 'lpr-config/camera-list'},
            {id: '8', name: WebConstants.MENU_NAMES.USER, cssClass:'fa fa-user', href: '/user'}
        ],
        ROLE_SUPERVISOR:[
            {id: '4', name: WebConstants.MENU_NAMES.REGISTERED_VEHICLE, cssClass:'fa fa-th-list', href: 'lpr-config/registered-vehicle'},
            {id: '5', name: WebConstants.MENU_NAMES.SHIFT_DETAIL, cssClass:'fa fa-exclamation-triangle', href: 'shift-details'},
            {id: '6', name: WebConstants.MENU_NAMES.CAMERA_GROUP, cssClass:'fa fa-object-group', href: 'lpr-config/camera-group'},
            {id: '7', name: WebConstants.MENU_NAMES.CAMERA_LIST, cssClass:'fa fa-camera', href: 'lpr-config/camera-list'},
            {id: '8', name: WebConstants.MENU_NAMES.USER, cssClass:'fa fa-user', href: '/user'}
        ],
        ROLE_PATROLLING_OFFICER:[
            {id: '5', name: WebConstants.MENU_NAMES.SHIFT_DETAIL, cssClass:'fa fa-exclamation-triangle', href: 'shift-details'},
            {id: '8', name: WebConstants.MENU_NAMES.USER, cssClass:'fa fa-user', href: '/user'}
        ]
    }
  ];
