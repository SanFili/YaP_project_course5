//класс для работы с данными пользователя
class UserInfo {
  constructor(form, api, userName, userAbout, userPhoto, inputName, inputAbout, popup) {
    this.form = form;
    this.api = api;
    this.userName = userName;
    this.userAbout = userAbout;
    this.userPhoto = userPhoto;
    this.inputName = inputName;
    this.inputAbout = inputAbout;
    this.popup = popup;
  }

  insertData(data) {
    this.userName.textContent = data.name;
    this.userAbout.textContent = data.about;
    this.inputName.value = data.name;
    this.inputAbout.value = data.about;
  }

  defaultInfo() {
    this.api.getUserInfo()
      .then((res) => {
        this.insertData(res);
        this.userPhoto.style.backgroundImage = `url("${res.avatar}")`;
      })
      .catch(err => console.log(err));
  }

  setUserInfo(name, info) {
    this.api.saveEditedInfo(name, info)
      .then((res) => {
        this.insertData(res);
        this.popup.close();
      })
      .catch(err => console.log(err));
  }

  changeAvatar(avatar) {
    this.api.editUserPhoto(avatar) 
      .then((res) => {
        this.userPhoto.style.backgroundImage = `url("${res.avatar}")`;
        this.popup.close();
      })
      .catch(err => console.log(err));
  }
}
