# Boardgame Library Service

## What it should handle

- Injest the boardgame collection from bgg via the [api](https://boardgamegeek.com/wiki/page/BGG_XML_API2)
- Serve it out to the webapp
- Communicate with a database

## Libs

https://www.npmjs.com/package/fast-xml-parser
https://www.npmjs.com/package/xml2jsbn

## XML

```xml
<item objecttype="thing" objectid="68448" subtype="boardgame" collid="116760239">
  <name sortindex="1">7 Wonders</name>
  <yearpublished>2010</yearpublished>
  <image>https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__original/img/jt70jJDZ1y1FWJs4ZQf5FI8APVY=/0x0/filters:format(jpeg)/pic7149798.jpg</image>
  <thumbnail>https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__thumb/img/BUOso8b0M1aUOkU80FWlhE8uuxc=/fit-in/200x150/filters:strip_icc()/pic7149798.jpg</thumbnail>
  <stats minplayers="2" maxplayers="7" minplaytime="30" maxplaytime="30" playingtime="30" numowned="143113" >
    <rating value="N/A">
      <usersrated value="105163" />
      <average value="7.68058" />
      <bayesaverage value="7.57092" />
      <stddev value="1.27744" />
      <median value="0" />
    </rating>
    </stats>
  <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2024-02-27 11:21:45" />
  <numplays>0</numplays>
</item>
```

```xml
<boardgames termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
	<boardgame objectid="68448">
		<yearpublished>2010</yearpublished>
		<minplayers>2</minplayers>
		<maxplayers>7</maxplayers>
		<playingtime>30</playingtime>
		<minplaytime>30</minplaytime>
		<maxplaytime>30</maxplaytime>
		<name primary="true" sortindex="1">7 Wonders</name>
		<description>You are the leader of one of the 7 great cities of the Ancient World. Gather resources, develop commercial routes, and affirm your military supremacy. Build your city and erect an architectural wonder which will transcend future times.&lt;br/&gt;&lt;br/&gt;7 Wonders lasts three ages. In each age, players receive seven cards from a particular deck, choose one of those cards, then pass the remainder to an adjacent player. Players reveal their cards simultaneously, paying resources if needed or collecting resources or interacting with other players in various ways. (Players have individual boards with special powers on which to organize their cards, and the boards are double-sided). Each player then chooses another card from the deck they were passed, and the process repeats until players have six cards in play from that age. After three ages, the game ends.&lt;br/&gt;&lt;br/&gt;In essence, 7 Wonders is a card development game. Some cards have immediate effects, while others provide bonuses or upgrades later in the game. Some cards provide discounts on future purchases. Some provide military strength to overpower your neighbors and others give nothing but victory points. Each card is played immediately after being drafted, so you&#039;ll know which cards your neighbor is receiving and how her choices might affect what you&#039;ve already built up. Cards are passed left-right-left over the three ages, so you need to keep an eye on the neighbors in both directions.&lt;br/&gt;&lt;br/&gt;Though the box of earlier editions is listed as being for 3&amp;ndash;7 players, there is an official 2-player variant included in the instructions.&lt;br/&gt;&lt;br/&gt;</description>
		<thumbnail>https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__thumb/img/BUOso8b0M1aUOkU80FWlhE8uuxc=/fit-in/200x150/filters:strip_icc()/pic7149798.jpg</thumbnail>
		<image>https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__original/img/jt70jJDZ1y1FWJs4ZQf5FI8APVY=/0x0/filters:format(jpeg)/pic7149798.jpg</image>
		<poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2454">
			<results numplayers="1">
				<result value="Best" numvotes="4" />
				<result value="Recommended" numvotes="17" />
				<result value="Not Recommended" numvotes="1501" />
			</results>
			<results numplayers="2">
				<result value="Best" numvotes="117" />
				<result value="Recommended" numvotes="391" />
				<result value="Not Recommended" numvotes="1308" />
			</results>
			<results numplayers="3">
				<result value="Best" numvotes="516" />
				<result value="Recommended" numvotes="1295" />
				<result value="Not Recommended" numvotes="233" />
			</results>
			<results numplayers="4">
				<result value="Best" numvotes="1303" />
				<result value="Recommended" numvotes="819" />
				<result value="Not Recommended" numvotes="47" />
			</results>
			<results numplayers="5">
				<result value="Best" numvotes="1167" />
				<result value="Recommended" numvotes="879" />
				<result value="Not Recommended" numvotes="62" />
			</results>
			<results numplayers="6">
				<result value="Best" numvotes="523" />
				<result value="Recommended" numvotes="1247" />
				<result value="Not Recommended" numvotes="180" />
			</results>
			<results numplayers="7">
				<result value="Best" numvotes="436" />
				<result value="Recommended" numvotes="1160" />
				<result value="Not Recommended" numvotes="321" />
			</results>
			<results numplayers="7+">
				<result value="Best" numvotes="31" />
				<result value="Recommended" numvotes="110" />
				<result value="Not Recommended" numvotes="1013" />
			</results>
		</poll>
		<statistics page="1">
			<ratings >
				<usersrated>105163</usersrated>
				<average>7.68058</average>
				<bayesaverage>7.57092</bayesaverage>
				<ranks>
					<rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="93" bayesaverage="7.57092" />
					<rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="103" bayesaverage="7.53407" />
					<rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="17" bayesaverage="7.56645" />
				</ranks>
				<stddev>1.27744</stddev>
				<median>0</median>
				<owned>143113</owned>
				<trading>1877</trading>
				<wanting>981</wanting>
				<wishing>13914</wishing>
				<numcomments>16423</numcomments>
				<numweights>5295</numweights>
				<averageweight>2.3167</averageweight>
			</ratings>
		</statistics>
	</boardgame>
</boardgames>
```

```xml
<boardgames termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
	<boardgame objectid="237182">
		<yearpublished>2018</yearpublished>
		<minplayers>2</minplayers>
		<maxplayers>4</maxplayers>
		<playingtime>90</playingtime>
		<minplaytime>60</minplaytime>
		<maxplaytime>90</maxplaytime>
		<age>10</age>
		<name primary="true" sortindex="1">Root</name>
		<name  sortindex="1">Root: A Game of Woodland Might and Right</name>
		<name  sortindex="1">Корни</name>
		<name  sortindex="1">ルート</name>
		<name  sortindex="1">茂林源记</name>
		<name  sortindex="1">루트</name>
		<description>Root is a game of adventure and war in which 2 to 4 (1 to 6 with the &#039;Riverfolk&#039; expansion) players battle for control of a vast wilderness. Like Vast: The Crystal Caverns, each player in Root has unique capabilities and a different victory condition. Now, with the aid of gorgeous, multi-use cards, a truly asymmetric design has never been more accessible.&lt;br/&gt;&lt;br/&gt;The nefarious Marquise de Cat has seized the great woodland, intent on harvesting its riches. Under her rule, the many creatures of the forest have banded together. This Alliance will seek to strengthen its resources and subvert the rule of Cats. In this effort, the Alliance may enlist the help of the wandering Vagabonds who are able to move through the more dangerous woodland paths. Though some may sympathize with the Alliance&amp;rsquo;s hopes and dreams, these wanderers are old enough to remember the great birds of prey who once controlled the woods.&lt;br/&gt;&lt;br/&gt;Meanwhile, at the edge of the region, the proud, squabbling Eyrie have found a new commander who they hope will lead their faction to resume their ancient birthright. The stage is set for a contest that will decide the fate of the great woodland. It is up to the players to decide which group will ultimately take root.&lt;br/&gt;&lt;br/&gt;In Root, players drive the narrative, and the differences between each role create an unparalleled level of interaction and replayability. Leder Games invites you and your family to explore the fantastic world of Root!&lt;br/&gt;&lt;br/&gt;&amp;mdash;description from the publisher&lt;br/&gt;&lt;br/&gt;</description>
		<thumbnail>https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__thumb/img/ACovMZzGGIsBRyEQXFnsT8282NM=/fit-in/200x150/filters:strip_icc()/pic4254509.jpg</thumbnail>
		<image>https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__original/img/E0s2LvtFA1L5YKk-_44D4u2VD2s=/0x0/filters:format(jpeg)/pic4254509.jpg</image>
		<poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1152">
			<results numplayers="1">
				<result value="Best" numvotes="3" />
				<result value="Recommended" numvotes="84" />
				<result value="Not Recommended" numvotes="704" />
			</results>
			<results numplayers="2">
				<result value="Best" numvotes="25" />
				<result value="Recommended" numvotes="322" />
				<result value="Not Recommended" numvotes="564" />
			</results>
			<results numplayers="3">
				<result value="Best" numvotes="205" />
				<result value="Recommended" numvotes="713" />
				<result value="Not Recommended" numvotes="72" />
			</results>
			<results numplayers="4">
				<result value="Best" numvotes="950" />
				<result value="Recommended" numvotes="123" />
				<result value="Not Recommended" numvotes="11" />
			</results>
			<results numplayers="4+">
				<result value="Best" numvotes="61" />
				<result value="Recommended" numvotes="248" />
				<result value="Not Recommended" numvotes="403" />
			</results>
		</poll>
		<poll name="language_dependence" title="Language Dependence" totalvotes="69">
			<results>
				<result level="1" value="No necessary in-game text" numvotes="0" />
				<result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
				<result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="18" />
				<result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="46" />
				<result level="5" value="Unplayable in another language" numvotes="4" />
			</results>
		</poll>
		<poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="248">
			<results>
				<result value="2" numvotes="0" />
				<result value="3" numvotes="0" />
				<result value="4" numvotes="0" />
				<result value="5" numvotes="2" />
				<result value="6" numvotes="0" />
				<result value="8" numvotes="16" />
				<result value="10" numvotes="36" />
				<result value="12" numvotes="76" />
				<result value="14" numvotes="103" />
				<result value="16" numvotes="15" />
				<result value="18" numvotes="0" />
				<result value="21 and up" numvotes="0" />
			</results>
		</poll>
		<statistics page="1">
			<ratings >
				<usersrated>52143</usersrated>
				<average>8.07215</average>
				<bayesaverage>7.88373</bayesaverage>
				<ranks>
					<rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="31" bayesaverage="7.88373" />
					<rank type="family" id="4664" name="wargames" friendlyname="War Game Rank" value="11" bayesaverage="7.75136" />
					<rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="31" bayesaverage="7.85564" />
				</ranks>
				<stddev>1.46746</stddev>
				<median>0</median>
				<owned>80765</owned>
				<trading>574</trading>
				<wanting>1645</wanting>
				<wishing>20571</wishing>
				<numcomments>7525</numcomments>
				<numweights>2159</numweights>
				<averageweight>3.8073</averageweight>
			</ratings>
		</statistics>
	</boardgame>
</boardgames>
```
