import { inject } from "@vue/runtime-core";

export default function useMessageBox() {
    return {
        $show: inject('$messageBox'),
        $prompt: inject('$prompt'),
        $alert: inject('$alert'),
        $confirm: inject('$confirm'),
    }
}