import baseUrl from "../../../Components/Utils/baseUrl"

class RegisterService {

  constructor() {
    this.settings = {
      url: baseUrl
    };
  }

  createUser() {
    return axios.post(`${this.settings.basePath}/user_signup`, {
      firstName: 'Fred',
    })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  

}

export default new RegisterService();
