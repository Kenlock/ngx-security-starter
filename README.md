<h3>Due to a time constraint, unfortunately this repository is no longer maintained.</h3>

# ngx-security-starter
A full implementation of the heloufir/security-starter with an Angular 7+ front-end implementation

![ngx-security-starter screnshot](https://lh3.googleusercontent.com/-lDr-gxRANiI/XKRitiJ9C_I/AAAAAAAAE1w/KggNNarsmHopqry863_rQpHyD5-A6gR8gCLcBGAs/s0/2019-04-03_083448.png "2019-04-03_083448.png")

## Installation
First of all, clone this repository into your local by executing the command:

```
  git clone https://github.com/heloufir/ngx-security-starter.git
```

## Configuration
After that the repository is cloned into your local, you need to follow the next steps to make it ready to use:

**1. Install back-end dependencies**

```
  cd ~\RepositoryPath
  cd back-end
  composer install
```

**2. Configure the project environement**

Create the `.env` file in the **back-end** root path, this file needs to have the following configuration variables to make the starter work perfectly:

> **heloufir/simple-passport** package variables *(of course you can customize it as you want)*

```
  SP_RECOVER_URL=http://localhost:4200/auth/recover/
  SP_MAIL_FROM=noreply@application.com
  SP_MAIL_FROM_NAME="Ngx Security Starter"
```

> **SMTP** server configuration *(of course you can customize it as you want)*

```
  MAIL_DRIVER=smtp
  MAIL_HOST=smtp.mailtrap.io
  MAIL_PORT=2525
  MAIL_USERNAME=YOUR_USERNAME
  MAIL_PASSWORD=YOUR_PASSWORD
  MAIL_ENCRYPTION=null
```

> **Database** configuration *(of course you can customize it as you want)*

```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=ngx_security_starter
  DB_USERNAME=root
  DB_PASSWORD=
```

> You need to execute `php artisan config:cache` to update the laravel application cache to recognize the new environement variables

**3. Install front-end dependencies**

```
  cd ~\RepositoryPath
  cd front-end
  npm install
```

*You can use the* `yarn install` *if you want to install dependencies using **yarn** instead of **npm***

## Migrate and seed data into the starter database

After creating the starter project database into your database server, you need to execute the migration command to install the starter tables into your database server:

```
  cd ~\RepositoryPath
  cd back-end
  php artisan migrate
```

Now you can use the database seeder provided by the starter project to insert sample data, so you can use the starter application:

```
  cd ~\RepositoryPath
  cd back-end
  php artisan db:seed
```

> **Laravel/Passport** configuration

```
  cd ~\RepositoryPath
  cd back-end
  php artisan passport:install
```

**4. Configure Laravel/Passport client into the front-end application**

Before you can use the application you need to configure your laravel/passport client token into you front-end application.
To do it, follow the next steps:

* Go to **~\RepositoryPath\front-end\src\app\services\security\authentication.service.ts**
* Change the variables `CLIENT_ID` and `CLIENT_SECRET` with your newly created clients that you can find in the table **oauth_clients**

> You need to choose the **oauth client token** that is 

## Serve & use

From here you can serve the starter application and use the sample user created by the database seeders.

> Serve the starter back-end that have **password_client = true**

```
  cd ~\RepositoryPath
  cd back-end
  php artisan serve
```

> Serve the starter front-end

```
  cd ~\RepositoryPath
  cd front-end
  ng serve
```

After serving the back-end and front-end of the starter application, you can access the application by going to the url http://localhost:4200 *(if you serve the front-end with another port, don't forget to change the url port)*

The sample user credentials are:
* Email address: **john.doe@gmail.com**
* Passwrd: **secret**

## Related repositories

* [Simple passport](https://github.com/heloufir/simple-passport): An implementation of laravel/passport package and an implementation of a simple forgot password system
* [Security starter](https://github.com/heloufir/security-starter): An implementation of heloufir/simple-passport package and an implementation of a simple USER_PROFILE_ROLE architecture, and some good utilities to start your project and focus into your business logic

## Credits

This starter application use the **[StarAdmin Angular template](https://github.com/BootstrapDash/StarAdmin-Free-Angular-Admin-Template)**, it's a beautiful template to start your project with, you can check the link to have more information about it!

## Releases

| Release  | Description |
| ------------- | ------------- |
| **1.0**  | First stable version: Initial version  |
| **1.1**  | Upgrade **heloufir/security-starter** version (Bug-fixing)  |
| **1.2**  | Upgrade the front-end dependencies & Add user's image feature |
| **1.3**  | Add account settings page |
| **1.4** | Implement translation system |

# Happy coding!
