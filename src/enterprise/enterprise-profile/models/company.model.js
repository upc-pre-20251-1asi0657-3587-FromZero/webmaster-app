export class CompanyEntity{
    enterprise_name;
    profile_img_url;
    description;
    country;
    RUC;
    phone;
    website;
    sector;
    User;
    constructor(enterprise_name, profile_img_url, description, country, RUC, phone, website, sector, User=Object){
        this.enterpriseName = enterprise_name;
        this.profileImgUrl = profile_img_url;
        this.description = description;
        this.country = country;
        this.RUC = RUC;
        this.phone=phone;
        this.website = website;
        this.sector = sector;
        this.User = User;
    };
}
