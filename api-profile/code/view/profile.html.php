<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
    <title>Perfil</title>
</head>
<body>
    <div  class="w3-card w3-padding w3-margin">
    <div class="w3-row-padding">
            <div class="w3-col">
                      
                <label class="w3-text-grey">URL</label><br>
                <a href="http://localhost:8082/page/<?php echo $profile["nickname"]; ?>">http://localhost:8082/page/<?php echo $profile["nickname"]; ?></a>

            </div>
        </div>
        <div class="w3-row-padding">
            <div class="w3-third">
                      
                <label class="w3-text-grey">Nickname</label>
                <input class="w3-input w3-border" type="text" value="<?php echo $profile["nickname"]; ?>" disabled>

            </div>
            <div class="w3-third">
                      
                <label class="w3-text-grey">Nombre</label>
                <input class="w3-input w3-border" type="text" value="<?php echo $profile["first_name"]; ?>" disabled>

            </div>
            <div class="w3-third">
                      
                <label class="w3-text-grey">Apellido</label>
                <input class="w3-input w3-border" type="text" value="<?php echo $profile["last_name"]; ?>" disabled>

            </div>
        </div>
        <div class="w3-row-padding">
            <div class="w3-third">
                      
                <label class="w3-text-grey">Dirección Postal</label>
                <input class="w3-input w3-border" type="text" value="<?php echo $profile["public_info"]==0?"**********":$profile["postal_address"]; ?>" disabled>

            </div>
            <div class="w3-third">
                      
                <label class="w3-text-grey">Compañía</label>
                <input class="w3-input w3-border" type="text" value="<?php echo $profile["public_info"]==0?"**********":$profile["company"]; ?>" disabled>

            </div>
            <div class="w3-third">
                      
                <label class="w3-text-grey">País</label>
                <input class="w3-input w3-border" type="text" value="<?php echo $profile["public_info"]==0?"**********":$profile["country"]; ?>" disabled>

            </div>
        </div>
        <div class="w3-row-padding">

            <div class="w3-col">
                      
                <label class="w3-text-grey">Links</label>
                <textarea name="" id="" class="w3-input w3-border" disabled><?php echo $profile["public_info"]==0?"**********":$profile["links"]; ?></textarea>

            </div>
        </div>
        <div class="w3-row-padding">

            <div class="w3-col">
                      
                <label class="w3-text-grey">Biografía</label>
                <textarea name="" id="" class="w3-input w3-border" disabled><?php echo $profile["public_info"]==0?"**********":$profile["biography"]; ?></textarea>

            </div>
        </div>
    </div>
</body>
</html>