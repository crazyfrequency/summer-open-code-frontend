import { CreationReason, InfoTypeCode, ParticipantStatus } from "./enums";
import { IBase } from "./root.types";

export interface IImportData extends IBase {
	xmlns: string
	edno: number
	edDate: string
	edAuthor: number
	edReceiver: number
	creationReason: CreationReason
	creationDateTime: string
	infoTypeCode: InfoTypeCode
	businessDay: string
	directoryVersion: number
	partInfoList: number[]
	initialEDList: number[]
	bicDirectoryEntryList: number[]
}

export interface IParticipantInfo extends IBase {
	nameP: string
	englName: string
	regN: string
	cntrCd: string
	rgn: string
	ind: string
	tnp: string
	nnp: string
	adr: string
	prntBIC: number
	dateInParticipant: string
	dateOutParticipant: string
	ptType: string
	srvcs: string
	uid: number
	participantStatus: ParticipantStatus
	bicParticipantInfoId: number
	rstrLists: number[]
}