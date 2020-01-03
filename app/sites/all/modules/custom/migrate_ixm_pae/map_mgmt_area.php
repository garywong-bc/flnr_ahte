<?php


// This function is called after prepareRow
// It is used to convert the Management Area ePUPs into PAE format
public function ManagementArea($term) {
  foreach ($term as $key=>$area) {
	switch($area) {
	  case ('Thompson Northern Forest'):
		$term[$key] = 336; // PAE - Adams River - Adams Lake
		break;
	  case ('Arrow'):
		$term[$key] = 337; // PAE - Arrow Lakes and Slocan Lake
		break;
	  case ('Atlin Tatshenshini'):
		$term[$key] = 394;  // PAE - Atlin
		break;
	  case ('Babine'):
		$term[$key] = 338; // PAE - Babine
		break;
	  case ('Bella Coola'):
		$term[$key] = 339; // PAE - Bella Coola
		break;
	  case ('Cape Scott'):
		$term[$key] = 340; // PAE - Cape Scott
		break;
	  case ('Central Coast'):
		$term[$key] = 341; // PAE - Central Coast
		break;
	  case ('Clayoquot'):
		$term[$key] = 342; // PAE - Clayoquot
		break;
	  case ('Cowichan'):
		$term[$key] = 343; // PAE - Cowichan
		break;
	  case ('South Fraser'):
		$term[$key] = 344; // PAE - Cultus Lake-Skagit Valley
		break;
	  case ('Peace South'):
		$term[$key] = 345; // PAE - Dawson Creek
		break;
	  case ('East Okanagan'):
		$term[$key] = 346; // PAE - East Okanagan
		break;
	  case ('Peace North'):
		$term[$key] = 347; // PAE - Fort St. John - Fort Nelson
		break;
	  case ('East Kootenay (North)'):
		$term[$key] = 348; // PAE - Golden - Invermere
		break;
	  case ('Haida Gwaii'):
		$term[$key] = 349; // PAE - Haida Gwaii
		break;
	  case ('North Fraser'):
		$term[$key] = 350; // PAE Harrison Lake area
		break;
	  case ('Howe Sound'):
		$term[$key] = 351; // PAE - Howe Sound
		break;
	  case ('Juan De Fuca'):
		$term[$key] = 352; // PAE - Juan De Fuca
		break;
	  case ('Thompson Grasslands'):
		$term[$key] = 353; // PAE - Kamloops
		break;
	  case ('Kootenay Lake'):
		$term[$key] = 354; // PAE - Kootenay Lake
		break;
	  case ('Lakelse Douglas Channel'):
		$term[$key] = 355; // PAE - Lakelse Douglas Channel
		break;
	  case ('Liard'):
		$term[$key] = 356; // PAE - Liard
		break;
	  case ('Thompson Western Mountains'):
		$term[$key] = 357; // PAE - Lillooet
		break;
	  case ('Thompson Southern Rivers'):
		$term[$key] = 358; // PAE - Lytton- Ashcroft
		break;
	  case ('Central Coast'):
		$term[$key] = 359; // PAE - Mainland coast- Queen Charlotte Straight
		break;
	  case ('Qualicum'):
		$term[$key] = 360; // PAE - Nanaimo
		break;
	  case ('Nootka'):
		$term[$key] = 361; // PAE - Nootka
		break;
	  case ('North Cariboo'):
		$term[$key] = 362; // PAE - North Cariboo
		break;
	  case ('North Chilcotin'):
		$term[$key] = 363; // PAE - North Chilcotin
		break;
	  case ('North Coast'):
		$term[$key] = 364; // PAE - North Coast - Prince Rupert
		break;
	  case ('North Okanagan'):
		$term[$key] = 365; // PAE - North Okanagan
		break;
	  case ('Von Donop'):
		$term[$key] = 366; // PAE - Northern Gulf and Discovery Isl
		break;
	  case ('Omineca'):
		$term[$key] = 367; // PAE - Omineca - Williston Lake
		break;
	  case ('Arrowsmith'):
		$term[$key] = 368; // PAE - Parksville
		break;
	  case ('Pemberton'):
		$term[$key] = 369; // PAE - Pemberton
		break;
	  case ('Robson'):
		$term[$key] = 370; // PAE - Robson
		break;
	  case ('Saanich/South Gulf Islands'):
		$term[$key] = 333; // PAE - Saanich/South Gulf Islands
		break;
	  case ('Thompson Eastern Lakes'):
		$term[$key] = 299; // PAE - Shuswap;
		break;
	  case ('Skeena Nass'):
		$term[$key] = 300; // PAE - Skeena Nass
		break;
	  case ('South Cariboo'):
		$term[$key] = 301; // PAE - South Cariboo
		break;
	  case ('South Chilcotin'):
		$term[$key] = 302; // PAE - South Chilcotin
		break;
	  case ('South Okanagan'):
		$term[$key] = 320; // PAE - South Okanagan
		break;
	  case ('East Kootenay (South)'):
		$term[$key] = 280; // PAE - East Kootenay (South)
		break;
	  case ('Stikine'):
		$term[$key] = 305; // PAE - Stikine
		break;
	  case ('Strathcona'):
		$term[$key] = 306; // PAE - Strathcona
		break;
	  case ('Sunshine Coast'):
		$term[$key] = 307; // PAE - Sunshine Coast
		break;
	  case ('Tatshenshini/Kispiox'):
		$term[$key] = 308; // PAE - Tatshenshini/Kispiox
		break;
	  case ('Tweedsmuir (North)'):
		$term[$key] = 309; // PAE - Tweedsmuir (North)
		break;
	  case ('Upper Fraser'):
		$term[$key] = 310; // PAE - Upper Fraser- McBride
		break;
	  case ('Vancouver'):
		$term[$key] = 311; // PAE - Vancouver
		break;
	  case ('Nechako'):
		$term[$key] = 312; // PAE - Vanderhoof
		break;
	  case ('West Okanagan'):
		$term[$key] = 321; // PAE - West Okanagan
		break;
	  case ('Whistler'):
		$term[$key] = 315; // PAE - Whistler
		break;
	  default:
		$term[$key] = $area;
		break;
	}
  }
  return $term;
} // End of ManagementArea function
