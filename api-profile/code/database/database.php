<?php
function connect(){
    $connection = new mysqli("mysqldbapi","admin","elden","user_profile");

    // Check connection
    if ($connection -> connect_errno) {
        echo "Failed to connect to MySQL: " . $connection -> connect_error;
        exit();
    }
    return $connection;
}

function query($sql){
    $connection=connect();
    $result = $connection->query($sql);
    if (!$result) {
        printf("Errormessage: %s\n", $connection->error);
    }
    $connection->close();
    return $result->fetch_assoc();
}

function command($sql){
    $connection=connect();

    $result = $connection->query($sql);
    $connection->close();

}