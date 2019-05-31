export default {
    "WHY_CANT_CHANGE_HASH" : `
    <p>The "hash" of a record is not a piece of data stored alongside it.
    It is the result of applying a mathematical function to the content.  You can change the content, 
    and the hash will change as a result, but you cannot directly control the hash value.
    Lying about the value of the hash won't help you because anybody else can check the hash himself.
    </p>
    <p>
    Contrast this with the "previous record hash" field.  That value <em>is</em> just a piece 
    of information stored with the record.  If you can access the record and write to it, then you can
    change the value stored as the "previous record hash".
    </p>
    `
}