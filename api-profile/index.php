<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
require_once 'code/controller/profile.controller.php';
require_once 'lib/limonade.php';


function configure(){

    option('views_dir', dirname(__FILE__).'/code/view');

}


dispatch('/', 'hello');
dispatch_post('/profile', 'register_user'); 
dispatch_put('/profile', 'create_profile'); 
dispatch_get('/profile/:id', 'profile'); 
dispatch_get('/page/:nickname', 'profile_page'); 


function register_user()
{
    $data['id']=$_POST['id'];
    $data['first_name']=$_POST['first_name'];
    $data['last_name']=$_POST['last_name'];

    file_put_contents('php://stderr', print_r(json_encode($data), TRUE));

    register($data);

    echo json_encode(['success'=>true]);

}

function create_profile()
{
    parse_str(file_get_contents("php://input"),$_PUT);

    $_PUT = json_decode(array_keys($_PUT)[0],true);

    upsert_profile($_PUT);
    echo json_encode(['success'=>true]);

}

function profile(){
    header('Content-Type: application/json');
    echo json_encode(["profile"=>get_profile(params('id'))]);
}

function profile_page(){
    $profile = get_profile(params('nickname'));
    set('profile', $profile);
    return html('profile.html.php',null);
}
function hello()
{
    return 'Hello world!';
}
run();