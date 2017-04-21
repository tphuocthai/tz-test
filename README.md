# Test timezone from mysql and NodeJS
- Create `config.env` file

    ```
    MYSQL_HOST=mysql
    MYSQL_USER=user
    MYSQL_PASSWORD=mysecret
    MYSQL_DATABASE=tztest
    MYSQL_RANDOM_ROOT_PASSWORD=yes
    ```

- Install docker and docker-compose
- Build and run app

    ```
    docker-compose build
    docker-compose up
    ```

- Access check the API nodejs response with this link: http://localhost:8080/api/tztest

# The setup
- Mysql container running with UTC timezone
- App container running with ICT timezone
- The API always return time in UTC converted string

You can see the different bettween mysql time and server created time. Please retest with branch `timezone-fix`