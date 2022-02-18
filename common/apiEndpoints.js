
const Host = {
  ROOT: "https://dev-projectrdv-v1.herokuapp.com",
  PREFIX: "/v1/api",
}
const ApiEndpoints = {
  UserEndpoints: {
    route: `${Host.PREFIX}/user`,
    list: `/list`,
    login: `/login`,
    signup: `/signup`,
    edit: `/edit/:id`,
    activate: `/activate/:id`,
    address: `/address/:id`,
    image: `/image/:id`,
    suspension: `/suspension/:id`,
    forgotPassword: `/forgot-password`,
    resetPassword: `/reset-password/:id`,
    confirmEmail: `/confirm-email/:id`,
  },
  ProductsEndpoints: {
    route: `${Host.PREFIX}/products`,
    list: `/list`,
    listtab: `/listtab`,
    create: `/create`,
    edit: `/edit/:id`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    review: `/review/:id`,
    distinct: `/distinct`,
    count: `/count`,
    views: `/views/:id`,
  },
  OrdersEndpoints: {
    route: `${Host.PREFIX}/orders`,
    list: `/list`,
    calculate: `/calculate`,
    create: `/create`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    status: `/status`,
    tracking: `/tracking`,
  },
  FileEndpoints: {
    route: `${Host.PREFIX}/file`,
    getSingleImageView: `/get-single-image/:id/view`,
    getSingleImageDownload: `/get-single-image/:id/download`,
    createSingleImage: `/create-single-image`,
    createMultipleImage: `/create-multiple-image`, 
  },
  wishlistEndpoints: {
    route: `${Host.PREFIX}/wishlist`,
    list: `/list`,
    create: `/create`,
    delete: `/delete/:id`,
  },
  MainEndpoints: {
    route: `${Host.PREFIX}/main`,
    list: `/list`,
    create: `/create`,
    edit: `/edit/:id`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
  },
  SubscribeEndpoints: {
    route: `${Host.PREFIX}/subscribe`,
    list: `/list`,
    create: `/create`
  },
  ContactEndpoints: {
    route: `${Host.PREFIX}/contact`,
    list: `/list`,
    create: `/create`
  },
};

module.exports = {ApiEndpoints , Host}