<?php
require  'vendor/autoload.php';
use Google\Spreadsheet\DefaultServiceRequest;
use Google\Spreadsheet\ServiceRequestFactory;

$leadId = $_POST['field0'];
$email = $_POST['field1'];
$q1 = $_POST['field2'];
$q2 = $_POST['field3'];
$q3 = $_POST['field4'];
$q4 = $_POST['field5'];
$q5 = $_POST['field6'];
$q6 = $_POST['field7'];
$q7 = $_POST['field8'];
$q8 = $_POST['field9'];
$q9 = $_POST['field10'];
$q10 = $_POST['field11'];




putenv('GOOGLE_APPLICATION_CREDENTIALS=' . __DIR__ . '/my_secret2.json');
		/*  SEND TO GOOGLE SHEETS */
		 $client = new Google_Client;
			try{
				$client->useApplicationDefaultCredentials();
			  $client->setApplicationName("Something to do with my representatives");
				$client->setScopes(['https://www.googleapis.com/auth/drive','https://spreadsheets.google.com/feeds']);
			   if ($client->isAccessTokenExpired()) {
					$client->refreshTokenWithAssertion();
				}

				$accessToken = $client->fetchAccessTokenWithAssertion()["access_token"];
				ServiceRequestFactory::setInstance(
					new DefaultServiceRequest($accessToken)
				);
			   // Get our spreadsheet
				$spreadsheet = (new Google\Spreadsheet\SpreadsheetService)
					->getSpreadsheetFeed()
					->getByTitle('INVESTOR');

				// Get the first worksheet (tab)
				$worksheets = $spreadsheet->getWorksheetFeed()->getEntries();
				$worksheet = $worksheets[0];


				$listFeed = $worksheet->getListFeed();
				$listFeed->insert([
					'id' => "'". $leadId,
					'email' => "'". $email,
					'question1' => "'". $q1,
					'question2' => "'". $q2,
					'question3' => "'". $q3,
					'question4' => "'". $q4,
					'question5' => "'". $q5,
					'question6' => "'". $q6,
					'question7' => "'". $q7,
					'question8' => "'". $q8,
					'question9' => "'". $q9,
					
				]);

			}catch(Exception $e){
			  echo $e->getMessage() . ' ' . $e->getLine() . ' ' . $e->getFile() . ' ' . $e->getCode;
			}
			
			/*  SEND TO GOOGLE SHEETS */