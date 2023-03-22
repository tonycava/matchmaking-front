<script lang="ts">
	export let data: App.PageData;
</script>

<style>

	#page {
		height: 100vh;
		display: grid;
		grid-template-columns: 10% 30% 20% 30% 10%;
		grid-template-rows: 30% 50% 20%;
		background-color: lightgray;
	}

	#explanation {
		grid-column-start: 2;
		grid-row-start: 2;
		margin: 10px;
		padding-top: 5%;
	}

	#characterSelect {
		grid-column-start: 3;
		grid-row-start: 2;
		margin: 10px;
		background-color: gray;
		border-radius: 5%;

		display: grid;
		justify-content: center;
	}

	#menu {
		grid-column-start: 4;
		grid-row-start: 2;
		margin: 10px;
		background-color: gray;
		border-radius: 5%;
		padding: 5% 0 0 5%;
	}

	#CharacterName {
		margin: 5% 15% 5% 15%;
	}
</style>


<div id="page">
	<div id="explanation">
		<h1>How to play :</h1>
		<br>
		<p>you appear in an arena with other players and asked to fight until a victor is chosen</p>
		<p>to do this you dispose of three weapons:</p>
		<br>
		<ul style="list-style-type:disc;padding-left:7%">
			<li>Rock, can be thrown at ennemies</li>
			<li>Paper, can be used as a shield</li>
			<li>Scissors, can be used as if a sword</li>
		</ul>
		
		<br>
		<p>Each weapon can interact with each others and the environment so don't be afraid to experiment</p>
	</div>
	<div id="characterSelect">
		<img src="/GameCharacterBlank.png" alt="" />
		<input type="text" id="CharacterName" placeholder="Enter your name">
	</div>
	<div id="menu">
		<p>test for postition</p>
	</div>
</div>
