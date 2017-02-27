<?php

	class Token {

		private $string;

		public function __construct() {
			if (isset($_POST['username'])) {
				$this->username = $_POST['username'];
				$this->salt = md5(uniqid(mt_rand(), true));
				$this->hash = $this->generate();
			} else if (isset($_POST['token'])) {
				if (isset($_POST['token']->username))
					$token = $_POST['token'];
				else
					$token = json_decode($_POST['token']);
				$this->username = $token->username;
				$this->salt = $token->salt;
				$this->hash = $token->hash;
				unset($_POST['token']);
			}
		}

		public function verify() {
			if (isset($this->username, $this->salt, $this->hash)) {
				if ($this->generate() == $this->hash)
					return true;
				else
					return false;
			} else
				return false;
		}

		private function generate() {
			$this->string = md5($this->username.$_SERVER['HTTP_USER_AGENT']);
			return md5($this->salt.$this->string);
		}

	}

?>