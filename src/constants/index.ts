import github from "/assets/images/icon-github.svg";
import gitlab from "/assets/images/icon-gitlab.svg";
import twitter from "/assets/images/icon-twitter.svg";
import freeCodeCamp from "/assets/images/icon-freecodecamp.svg";
import linkedin from "/assets/images/icon-linkedin.svg";
import twitch from "/assets/images/icon-twitch.svg";
import youtube from "/assets/images/icon-youtube.svg";
import stackOverFlow from "/assets/images/icon-stack-overflow.svg";
import hashnode from "/assets/images/icon-hashnode.svg";
import facebook from "/assets/images/icon-facebook.svg";
import devto from "/assets/images/icon-devto.svg";
import codepen from "/assets/images/icon-codepen.svg";
import codewars from "/assets/images/icon-codewars.svg";

import frontEndMentor from "/assets/images/icon-frontend-mentor.svg";

export interface SelectItem {
	name: string;
	logo: string;
	color: string;
	border?: string;
}

export const selectItems: SelectItem[] = [
	{
		name: "GitHub",
		logo: github,
		color: "#1a1a1a",
	},
	{
		name: "GitLab",
		logo: gitlab,
		color: "#eb4925",
	},
	{
		name: "Fronend Mentor",
		logo: frontEndMentor,
		color: "#fff",
		border: "#d9d9d9",
	},
	{
		name: "Twitter",
		logo: twitter,
		color: "#43b7e9",
	},
	{
		name: "LinkedIn",
		logo: linkedin,
		color: "#2d68ff",
	},
	{
		name: "Youtube",
		logo: youtube,
		color: "#ee3939",
	},
	{
		name: "Facebook",
		logo: facebook,
		color: "#2442ac",
	},
	{
		name: "Twitch",
		logo: twitch,
		color: "#ee3fc8",
	},
	{
		name: "Dev.to",
		logo: devto,
		color: "#333",
	},
	{
		name: "Codewars",
		logo: codewars,
		color: "#8a1a50",
	},
	{
		name: "freeCodeCamp",
		logo: freeCodeCamp,
		color: "#302667",
	},
	{
		name: "Hashnode",
		logo: hashnode,
		color: "#0330d1",
	},
	{
		name: "Codepen",
		logo: codepen,
		color: "#8a1a50",
	},
	{
		name: "Stack Overflow",
		logo: stackOverFlow,
		color: "#ec7100",
	},
];
