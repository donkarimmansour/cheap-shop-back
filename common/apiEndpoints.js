
const Host = {
  ROOT: "localhost:3000",
  PREFIX: "/v1/api",
}
const ApiEndpoints = {
  ProgrammeEndpoints: {
    route: `${Host.PREFIX}/programme`,
    list: `/list`,
    create: `/create/:id`,
    edit: `/edit/:id`,
    duplicate: `/duplicate/:id`,
  },
  AppointmentEndpoints: {
    route: `${Host.PREFIX}/appointment`,
    list: `/list`,
    users: `/users/:id`,
    create: `/create/:id`,
    edit: `/edit/:id`,
    activate: `/activate/:id`,
  },
  DoctorEndpoints: {
    route: `${Host.PREFIX}/doctor`,
    list: `/list`,
    login: `/login`,
    signup: `/signup`,
    edit: `/edit/:id`,
    activate: `/activate/:id`,
    loginActivate: `/login-activate/:id`,
    suspension: `/suspension/:id`,
    forgotPassword: `/forgot-password`,
    resetPassword: `/reset-password/:id`,
    confirmEmail: `/confirm-email/:id`,
  },
  ServicesEndpoints: {
    route: `${Host.PREFIX}/services`,
    list: `/list`,
    create: `/create/:id`,
    edit: `/edit/:id`,
    duplicate: `/duplicate/:id`,
    delete: `/delete/:id`,
  },
  UserEndpoints: {
    route: `${Host.PREFIX}/user`,
    list: `/list`,
    login: `/login`,
    signup: `/signup`,
    edit: `/edit/:id`,
    activate: `/activate/:id`,
    suspension: `/suspension/:id`,
    forgotPassword: `/forgot-password`,
    resetPassword: `/reset-password/:id`,
    confirmEmail: `/confirm-email/:id`,
  },
  FileEndpoints: {
    route: `${Host.PREFIX}/file`,
    getSingleImageView: `/get-single-image/:id/view`,
    getSingleImageDownload: `/get-single-image/:id/download`,
    createSingleImage: `/create-single-image`,
  },
};

module.exports = {ApiEndpoints , Host}