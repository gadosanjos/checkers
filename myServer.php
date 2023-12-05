<?php
//initial setup
    if(isset($_GET['start'])){
            $setupFlagFile = 'setup.flag';
            if(!file_exists($setupFlagFile)){
                include_once 'includes/connection.inc.php';
                include_once 'includes/tableCreation.inc.php';
                include_once 'includes/populate.inc.php';

                file_put_contents($setupFlagFile, 'Setup has been completed.');
            }
    }
