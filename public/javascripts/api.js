import { Client } from 'espn-fantasy-football-api/node';
import { getName } from './player-mapping';
require('dotenv').config();

const leagueId = '556765';
const espnS2 = 'AEBxADuFC%2FFFXtet4BKPeYzIiH2rh%2FT5w1x0dSFyV81EGRjGL3eYLhGbelAh2E9valZr1BFklpkirtAOsuNEYV7IKfQEguzUI0SXanW%2BfDqMbZvBYJDRQKW4o91asBKkFGyKYXtjYW4DCnT9nH9PXMzsWX%2BY%2BX0JEAussgLMcqB7Htcucg4QNPkNc%2FQghjEGXfD%2BubmYPCuQQJufK5ckMfkoJLCvaSOPgz%2BxJQ0ZAp4if0MJjsOGcm9QBqEB3L7dJ40%3D';
const SWID = '{A7B727B8-CE4E-47F4-89C0-5B24752F599E}';
const seasonId = '2022';

const myClient = new Client({ leagueId });

myClient.setCookies({ espnS2, SWID });

async function getEspnData() {
	const getScores = await myClient.getBoxscoreForWeek({
		seasonId,
		matchupPeriodId: 1,
		scoringPeriodId: 1
	});
	const matchupData = createEmbedFields(getScores);
	const embedded = embedData(matchupData);
	return embedded;
}

function createEmbedFields(boxScore) {
	const matchupArrayData = boxScore.map(scores => {
		const awayTeamId = getName(scores.awayTeamId.toString());
		const homeTeamId = getName(scores.homeTeamId.toString());
		const awayPoints = scores.awayScore.toString();
		const homePoints = scores.homeScore.toString();
		return [
			{
				name: awayTeamId,
				value: awayPoints,
				inline: true
			},
			{
				name: homeTeamId,
				value: homePoints,
				inline: true
			},
			{
				name: '\u200B',
				value: '\u200B'
			}
		];
	})
		.flat();
	return matchupArrayData;
}

function embedData(teamData) {
	const fflEmbed = {
		color: 0x0099ff,
		title: 'Current Scores',
		fields: teamData,
		timestamp: new Date(),
	};
	return { embeds: [fflEmbed] };
}

export default {
	getEspnData,
	embedData
};