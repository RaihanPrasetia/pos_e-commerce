import { BookmarkIcon } from "@heroicons/react/16/solid";
import { FaCheck, FaCog, FaTrash } from "react-icons/fa";

const iconClass = "w-6 h-6";

const menuItems = [
    {
        title: "Menu 1",
        options: [
            { name: "Draft Item", icon: <BookmarkIcon className={iconClass} />, action: "draft" },
            { name: "Option 2", icon: <FaCog className={iconClass} />, action: "Option 2" },
            { name: "Option 3", icon: <FaTrash className={iconClass} />, action: "Option 3" },
        ],
    },
    {
        title: "Menu 2",
        options: [
            { name: "Option A", icon: <FaCheck className={iconClass} />, action: "Option A" },
            { name: "Option B", icon: <FaCog className={iconClass} />, action: "Option B" },
            { name: "Option C", icon: <FaTrash className={iconClass} />, action: "Option C" },
        ],
    },
];

export default menuItems;