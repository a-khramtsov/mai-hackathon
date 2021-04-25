import { Status } from "../types";

export const formatStatus = (status: Status) => {
    switch (status) {
        case Status.NEW:
            return "новая заявка";
        case Status.CANCELLED:
            return "заявка отклонена пользователем";
        case Status.APPROVED_BY_AIRLINE:
            return "заявка подтверждена авиакомпанией";
        case Status.APPROVED_BY_DISPATCHER:
            return "заявка подтверждена диспетчером";
        case Status.EDITED_BY_AIRLINE:
            return "заявка изменена авиакомпанией";
        case Status.EDITED_BY_DISPATCHER:
            return "заявка изменена диспетчером";
        case Status.REFUSED_BY_AIRLINE:
            return "заявка отклонена авиакомпанией";
        case Status.REFUSED_BY_DISPATCHER:
            return "заявка отклонена диспетчером";
        case Status.APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE:
            return "заявка одобрена пользователем, ожидается одобрение авиакомпанией";
    }
};
