<?php
require_once "code/database/database.php";
function register($data){
    $sql = "insert into profile(id,first_name,last_name) 
            values('%s','%s','%s')
            ON DUPLICATE KEY UPDATE id='%s',first_name='%s',last_name='%s'";
    $sql = sprintf($sql, $data['id'],$data['first_name'],$data['last_name'],$data['id'],$data['first_name'],$data['last_name']);
    command($sql);
}


function upsert_profile($data){
    $sql = "insert into profile(id,first_name,last_name,nickname,public_info,postal_address,biography,company,country,links) 
    values('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')
    ON DUPLICATE KEY UPDATE 
    id='%s',first_name='%s',last_name='%s',nickname='%s',public_info='%s',postal_address='%s',biography='%s',company='%s',country='%s',links='%s'";
    $sql = sprintf(
        $sql, 
        $data['id'],
        $data['first_name'],
        $data['last_name'],
        $data['nickname'],
        $data['public_info'],
        $data['postal_address'],
        $data['biography'],
        $data['company'],
        $data['country'],
        $data['links'],
        $data['id'],
        $data['first_name'],
        $data['last_name'],
        $data['nickname'],
        $data['public_info'],
        $data['postal_address'],
        $data['biography'],
        $data['company'],
        $data['country'],
        $data['links']
    );
    command($sql);
}

function get_profile($condition){

    if( is_numeric($condition) ){

        $sql = "select * from profile where id = %s";
    }
    else{
        $sql = "select * from profile where nickname = '%s'";
    }

    $result = query(sprintf($sql,$condition));

    return $result;
}