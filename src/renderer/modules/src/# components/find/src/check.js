function lower(string) {
    if (typeof string !== 'string') return '';
    else return string.toLowerCase();
}

export default function check(find_name, find_ref, queue) {
    const select = queue[0];
    const each_object_raw = select.each_object;

    const each_ref = select.each_ref;
    const each_object = Array.isArray(each_object_raw)
        ? each_object_raw[0]
        : each_object_raw;
    if (!each_object) return;

    const each_name = each_object.$options.id;
    const each_refs = each_object.$refs;

    for (const each_ref in each_refs) queue.push({
        each_ref: each_ref,
        each_object: each_refs[each_ref]
    });

    const each_name_lower = lower(each_name);
    const find_name_lower = lower(find_name);
    const each_ref_lower = lower(each_ref);
    const find_ref_lower = lower(find_ref);

    const equal_name = each_name_lower === find_name_lower;
    const equal_ref = each_ref_lower === find_ref_lower;

    const byNameAndRef = equal_name && (equal_ref || !find_ref_lower);
    const byRef = equal_ref && !find_name_lower;

    if (byNameAndRef || byRef) return each_object;
}
