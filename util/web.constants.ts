/**
 * @author RIAZ JAFFARY
 */

export const WebConstants = {
  INT_ZERO: 0,
  INT_ONE: 1,
  INT_TWO: 2,
  INT_THREE: 3,
  INT_FOUR: 4,
  INT_FIVE: 5,
  SECONDS_IN_A_DAY: 86400000,
  ORIGIN: "WEB",
  PROJECT_NAME: "Conure OLIOS",
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  METHOD_TYPE: {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE"
  },
  DATE: {
    FORMAT_YYYY_MM_DD: "yyyy-MM-dd",
    FORMAT_MM_DD_YYYY: "MM-dd-yyyy",
    FORMAT_DD_MM_YYYY: "dd/MM/yyyy",
    DAYS_IN_WEEK: 6,
    LAST_DAY_OF_MONTH: 29
  },
  USER: {
    LOGGED_IN: "CITS_CD_LOGGED_IN_USER", //"currentUser",
    ID: "CITS_CD_USER_ID",
    ORGANIZATION_ID: "CITS_CD_ORGANIZATION_ID",
    TOKEN: "CITS_CD_USER_TOKEN",
    AUTHORITIES: "CITS_CD_AUTHORITIES",
  },
  USER_ROLE: {
    SUPER_ADMIN: "ROLE_SUPER_ADMIN",
    ADMIN: "ROLE_ADMIN",
    MANAGER: "ROLE_MANAGER",
    PEO: "ROLE_PEO",
  },
  STATUS: {
    CODE_SUCCESS: 0,
    MSG_SUCCESS: "success",
    CODE_NOTFOUND: 404,
    MSG_NOTFOUND: "not found",
    CODE_ACCESS_DENIED: "9999",
    CODE: {
      ACTIVE: 1,
      INACTIVE: 2,
    },
    MSG: {
      ACTIVE: "Active",
      INACTIVE: "Inactive",
    },
  },
  OCCUPY_STATUS: {
    OCCUPIED: "Occupied",
    UNOCCUPIED: "Unoccupied",
  },
  SPOT:{
    COLOR: {
      GREEN: "green",
      ORANGE: "orange",
      RED: "red"
    },
    LABEL: {
      GREEN: "green",
      ORANGE: "orange",
      RED: "red"
    }
  },
  ERROR: {
    UNDEFINED_INTERNAL_SERVER: "Internal server error undefined",
    INTERNAL_SERVER: "Internal server error"
  },
  MAP_TAB: {
    CURRENT_SESSION: {
      ID: "CURRENT_SESSION",
      NAME: "Current Expired Sessions",
      ACTIVE_TAB: "activeTabName_currentExpiredSession"
    },
    PAST_SESSION: {
      ID: "PAST_SESSION",
      NAME: "My Records",
      ACTIVE_TAB: "activeTabName_pastSession"
    },
    CALE_AMERICA_SESSION: {
      ID: "CALE_AMERICA_SESSION",
      NAME: "Cale America",
      ACTIVE_TAB: "activeTabName_caleAmerica",
      SELECTED_TAB: "CALE_AMERICA_LIVE_SESSION"
    },
    CALE_AMERICA_LIVE_SESSION: {
      ID: "CALE_AMERICA_LIVE_SESSION",
      NAME: "Cale America",
      ACTIVE_TAB: "activeTabName_caleAmerica"
    },
    CALE_AMERICA_TODAY_SESSION: {
      ID: "CALE_AMERICA_TODAY_SESSION",
      NAME: "Cale America",
      ACTIVE_TAB: "activeTabName_caleAmerica"
    },
    PARK_MOBILE_SESSION: {
      ID: "PARK_MOBILE_SESSION",
      NAME: "Cale America",
      ACTIVE_TAB: "activeTabName_parkMobile",
      DEFAULT_TAB: "PARK_MOBILE_LIVE_SESSION",
      LIVE_SESSION: {
        ID: "PARK_MOBILE_LIVE_SESSION",
        NAME: "Park Mobile",
        ACTIVE_TAB: "activeTabName_parkMobileLiveSession"
      },
      TODAY_SESSION: {
        ID: "PARK_MOBILE_TODAY_SESSION",
        NAME: "Park Mobile",
        ACTIVE_TAB: "activeTabName_parkMobileTodaySession"
      },
    },
    PARK_MOBILE_LIVE_SESSION: {
      ID: "PARK_MOBILE_LIVE_SESSION",
      NAME: "Park Mobile",
      ACTIVE_TAB: "activeTabName_parkMobile"
    },
    PARK_MOBILE_TODAY_SESSION: {
      ID: "PARK_MOBILE_TODAY_SESSION",
      NAME: "Park Mobile",
      ACTIVE_TAB: "activeTabName_parkMobile"
    },
  },
  PAST_SESSION: {
    IMAGE_TAG_DELETED: "DELETED"
  },
  GRAPH: {
    ACTION_TYPE: {
      DAILY: "DAILY",
      WEEKLY: "WEEKLY",
      MONTHLY: "MONTHLY",
      DATE_RANGE: "DATE_RANGE",
    },
    ACTION_TYPE_DAILY: "DAILY",
    ACTION_TYPE_WEEKLY: "WEEKLY",
    ACTION_TYPE_MONTHLY: "MONTHLY",
    ACTION_TYPE_DATE_RANGE: "DATE_RANGE",
  },
  ACTION_BY: {
    PEO: "PEO",
    ADMIN: "ADMIN"
  },
  ACTION_TAKEN: {
    TICKET: "TICKET",
    VEHICLE_LEFT: "VEHICLE_LEFT",
    WARNING_GIVEN: "WARNING_GIVEN",
    PERMIT: "PERMIT",
    PEO_NOT_AVAILABLE: "PEO_NOT_AVAILABLE",
    TICKET_VALUE: "Ticket",
    VEHICLE_LEFT_VALUE: "Vehicle Left",
    WARNING_GIVEN_VALUE: "Warning Given",
    PERMIT_VALUE: "Permit",
    PEO_NOT_AVAILABLE_VALUE: "Peo not available"
  },
  SPOT_STATUS: {
    OCCUPIED: "Occupied",
    UNOCCUPIED: "Unoccupied"
  },
  API_URL: {
    LOGIN: "/api/authenticate",
    LOGOUT: "/api/logout",
    USER: {
      FIND_ALL: "/api/user/find-all-users",
      COMMON_FIND_ALL: "/api/CommonMethod/find-all-users",
      ADD_USER: "/api/user/add-user",
      UPDATE_USER: "/api/user/update-user",
      DELETE_USER: "/api/user/delete-user/",
      ACTIVATE_USER: "/api/user/active-user/",
      FIND_USER_BY_ID: "/api/CommonMethod/find-user-by-id/",
      FIND_ALL_USER_BY_ORGANIZATION: "/api/user/find-by-organization/",
      FORGOT_PASSWORD: "/api/CommonMethod/forgot",
      FORGOT_EMAIL_ADDRESS: "/api/user/forgot-email-address",
      VERIFY_RESET_TOKEN: "/api/CommonMethod/verify/",
      RESET_PASSWORD: "/api/user/reset-password",
      CHANGE_PASSWORD: "/api/CommonMethod/change-password",
      PROFILE: "",
      TERMINATE_USER: "",
      FIND_USER_PRIVILEGES: "/api/user/privilege/findUserPrivilegesByUserId/",
      ADD_USER_PRIVILEGE: "/api/user/privilege/add",
      DELETE_USER_PRIVILEGE: "/api/user/privilege/deleteUserPrivilegeByUserIdAndPrivId/",
    },
    PRIVILEGE: {
      FIND_ALL_PRIVILEGE: "/api/privilege/find-all",
    },
    ROLE_PRIVILEGE_MENU: {
      FIND_ALL_ROLES: "/api/role/find-all-roles",
      FIND_ALL_PRIVILEGES: "/api/privilege/find-all-privileges",
      FIND_PRIVILEGE_BY_ID: "/api/privilege/find-privilege-by-role",
      FIND_MENU_BY_PRIVILEGE_ID: "/api/menu/privilege/find-by-privilege-id",
      ADD_MENU: "/api/menu/privilege/add",
      UPDATE_MENU: "/api/menu/privilege/update",
      ADD_ROLE_PRIVILEGE: "/api/role/privilege/add",
      UPDATE_PRIVILEGE: "/api/privilege/update"
    },
    DESIGNATION: {
      FIND_ALL_DESIGNATIONS: "/api/role/find-all-roles"
    },
    ORGANIZATION: {
      FIND_DETAIL: "/api/organization/find-detail/",
      FIND_ALL_ORGANIZATION: "/api/organization/find-all",
      ADD_ORGANIZATION: "/api/organization/add",
      UPDATE_ORGANIZATION: "/api/organization/update",
      DELETE_ORGANIZATION: "/api/organization/delete/",
      FIND_ORGANIZATION_BY_ID: "/api/organization/find/",
      FIND_ORGANIZATION_DETAIL_BY_ID: "/api/CommonMethod/find/", //FOR ORGANIZATION LOGO.
      ACTIVATE_ORGANIZATION:"/api/organization/activateOrganization/",
      DEACTIVATE_ORGANIZATION:"/api/organization/deactivateOrganization/"

    },
    license_EXPIRY: {
      FIND_ALL: "/api/LicenseExpiry/getAllExpiry",
      FIND_ORGANIZATION_BY_ID: "/api/LicenseExpiry/getExpiryById",
      ADD_license_EXPIRY:"/api/LicenseExpiry/addExpiry",
      UPDATE_license_EXPIRY:"/api/LicenseExpiry/updateExpiry/",
      DELETE_license_EXPIRY:"/api/LicenseExpiry/deleteExpiry/"
    

    },
    
    LPR_CAMERA : {
      ADD_LPR_CAMERA : "/api/alprcamera/add",
      UPDATE_LPR_CAMERA: "/api/alprcamera/update",
      DELETE_LPR_CAMERA : "/api/alprcamera/delete/",
      FIND_ALL_LPR_CAMERA : "/api/alprcamera/find-all"
    },
    LPR_CAMERA_GROUP : {
      ADD_LPR_CAMERA_GROUP : "/api/alprcamera-group/add",
      UPDATE_LPR_CAMERA_GROUP : "/api/alprcamera-group/update",
      DELETE_LPR_CAMERA_GROUP : "/api/alprcamera-group/delete/",
      FIND_ALL_LPR_CAMERA_GROUP : "/api/alprcamera-group/find-all"
    },
    LPR_WHITELIST : {
      ADD_LPR_WHITELIST : "/api/registered-vehicle/add",
      UPDATE_LPR_WHITELIST : "/api/registered-vehicle/update",
      ADD_MULTIPLE_LPR_WHITELIST : "/api/registered-vehicle/add-multiple",
      DELETE_LPR_WHITELIST : "/api/registered-vehicle/delete/",
      DELETE_ALL_REGISTERED_VEHICLE : "/api/registered-vehicle/delete-all",
      FIND_ALL_LPR_WHITELIST : "/api/registered-vehicle/find-all",
      FIND_WHITELIST_FILE_DATA: "/api/find-whitelist_file_data",
      FILE_UPLOADER_LPR_WHITELIST: "/api/registered-vehicle/upload",

    },
    LOOKUP: {
      FIND_ALL_ROLES: "/api/lookup/find-all-roles",
      FIND_ALL_PRIVILEGES: "/api/lookup/find-all-privileges",
    },
    PREFERENCES: {
      FIND_ALL_PREFERENCES: "/api/preference/find-all",
      ADD_PREFERENCES: "/api/preference/add",
      UPDATE_PREFERENCES: "/api/preference/update",
      DELETE_PREFERENCES: "/api/preference/delete/",
    },
    SHIFT_DATA: {
      FIND_ALL:"/api/patrolling-session/find-all-by-organization",
    },
    SHIFT_RAW_DATA: {
      FIND_ALL:"/api/lpr/find-data-by-sessionId/",
    },
    LPR: {
      FIND_PAST_ACTIONS:"/api/lpr/find-past-actions",
      FIND_ALL:"/api/lpr/find-all",
      FIND_VIOLATION_IMAGE_DETAILS: "/api/lpr/action-image/find/"
    },
    LPR_RAW: {
      FIND_ALL:"/api/lpr-raw/find-all",
      FIND_RAW_DATA_IMAGE_BY_SESSION_ID:"/api/lpr-raw/find-raw-data-images-by-sessionId/",
      FIND_STATS:"/api/lpr-raw/find-patrolling-session-statistics-by-org",
      FIND_STATS_DAILY:"/api/lpr-raw/find-patrolling-session-daily-statistics-by-org",
    },
    LPR_PROPERTY: {
      ADD_PROPERTY:"/api/property/add",
      UPDATE_PROPERTY:"/api/property/update",
      DELETE_PROPERTY_BY_ID:"/api/property/delete/",
      FIND_PROPERTY_BY_ID:"/api/property/find/",
      FIND_ALL:"/api/property/find-all",
    },
    LPR_SUB_PROPERTY: {
      ADD_SUB_PROPERTY:"/api/sub-property/add",
      UPDATE_SUB_PROPERTY:"/api/sub-property/update",
      DELETE_SUB_PROPERTY_BY_ID:"/api/sub-property/delete/",
      FIND_SUB_PROPERTY_BY_ID:"/api/sub-property/find/",
      FIND_ALL:"/api/sub-property/find-all",
      FIND_ALL_BY_PROPERTY_ID:"/api/sub-property/find-all-by-property-id/"
    },
    PAYMENT_DETAIL: {
      SEARCH: "/api/spot/payment/search"
    },
    DASHBOARD: {
      FIND_PEO_LAST_LOCATION: "/api/patrolling-session/find-peo-last-location",
    }
  },
  WEB_URL: {
    HOME: "",
    LOGIN: "login",
    ADD_NEW_PASSWORD: "add-new-password",
    FORGOT_PASSWORD: "forget-password",
    FORGOT_USERNAME: "forget-username",
    USER: "user",
    USER_PROFILE: "user/user-profile",
    CHANGE_PASSWORD: "user/change-password",
    ORGANIZATION: "organization",
    SHIFT_DETAIL: "shift-details",
    LPR_REGISTERED_VEHICLE: "lpr-config/registered-vehicle",
    LPR_VIOLATION: "lpr-data/violation",
    LPR_CAMERA_GROUP: "lpr-config/camera-group",
    LPR_CAMERA_LIST: "lpr-config/camera-list",
    LPR_SESSION_DATA: "lpr-data/session-data",
    LPR_PROPERTY: "lpr-config/property",
    DASHBOARD: "dashboard-organization",
  },
  WEB_SOCKET: {
    ENDPOINT: {
      WEB_NOTIFICATON: "/web-notification"
    },
    TOPIC: {
      MAP: "",
      RTM_NOTIFICATION: "/topic/rtmonitoring-notification",
      DEVICE_METRICS: "",
      SENSOR: "",
      WEB_NOTIFICATION: "/topic/web-notification",
      PARKING_SPOT_NOTIFICATION: "/topic/parkingspot-notification",
      MAP_ACTION_NOTIFICATION: "/topic/map-action-notification",
      SESSION_EXPIRED_NOTIFICATION: "/topic/session-expired-notification",
      CLIENT_NOTIFICATION: "/topic/client-notification",
      PAYMENT_NOTIFICATION: "/topic/payment-notification",
      REPORT_NOTIFICATION: ""
    },
    PAYLOAD_TYPE: {
      MESSAGE: "MESSAGE"
    }
  },
  MENU_NAMES : {
    PROJECT_NAME: "OLIOS Recovery",
    ORGANIZATION: "Organization Management",
    REGISTERED_VEHICLE: "Hit List Management",
    SHIFT_DETAIL: "Shift Details",
    CAMERA_GROUP: "Camera Group Management",
    CAMERA_LIST: "Camera Management",
    USER: "User Management",
    SHIFT_CHART: "Monthly Statistics",
    SHIFT_CHART_DAILY: "Daily Statistics",
    DASHBOARD: "Dashboard",
    LICENSE_MANAGEMENT:"License Management"
    
  },
  COPY_RIGHT : {
    YEAR: "2022"
  },
  PAGE_TITLE : {
    DASHBOARD: "Dashboard",
    CHART: "Chart",
    SHIFT_DETAILS: "Shift Details",
    FORGET_USERNAME: "Forget Username",
    FORGET_PASSWORD: "Forget Password",
    NEW_PASSWORD: "New Password",
    LOGIN: "Login",
    USER_PROFILE: "User Profile",
    ORGANIZATION: "Organization",
    USER_MANAGEMENT: "User Management",
    CHANGE_PASSWORD: "Change Password",
    HIT_LIST_MANAGEMENT: "Hit List Management",
    CAMERA_GROUP_MANAGEMENT: "Camera Group Management",
    CAMERA_MANAGEMENT: "Camera Management"
  }
};
