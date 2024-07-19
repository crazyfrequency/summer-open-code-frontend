import { ChangeType, CreationReason, InfoTypeCode, ParticipantStatus } from "./enums";
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
	partInfo: IPartInfo
	initialED: IInitialED
	bicDirectoryEntryList: number[]
}

export interface IPartInfo extends IBase {
	partNo: number
	partQuantity: number
	partAggregateId: String
	importData: number
}

export interface IInitialED extends IBase {
	edno: number
	edDate: string
	edAuthor: number
	importData: number
}

export interface IBicDirectoryEntry extends IBase {
	bic: number
	changeType: ChangeType
	importData: number
	participantInfo: IParticipantInfo
	swbics: number[]
	accountsList: number[]
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
	dateIn: string
	dateOut: string
	ptType: string
	srvcs: string
	xchType: string
	uid: number
	participantStatus: ParticipantStatus
	bicDirectoryEntry: number
	rstrLists: number[]
}