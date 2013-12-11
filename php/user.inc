<?php
	/*
	@author: Grant McKenzie (gmckenzie@spatialdev.com)
	@client: World Bank
	@project: OpenAid Map
	@date: November 2013
	@description: user object
	*/
	
	class OAMuser {
		
		public $username;
		public $user_id;
		public $first_name;
		public $last_name;
		public $active;
		public $email;
		
		public function __construct() {
			/*
			$this->id=$row->user_id;
			$this->email=$row->email;
			$this->first=$row->name_first;
			$this->last=$row->name_last;
			$this->lang=$row->lang;
			$this->role=$row->role;
			$this->org=$row->organisation; */
		}	
	}	
?>