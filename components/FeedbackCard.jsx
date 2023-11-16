const FeedbackCard = ({ content, name, title, img }) => (
    <div className="flex justify-between flex-col px-4 py-12 rounded-[20px] min-w-[320px] max-w-[380px] min-h-[300] my-0 mx-0 feedback-card">
        <img
            src={"https://i.imgur.com/rx3eOUo.png"}
            alt="double_quotes"
            className="w-[49.6px] h-[27.6px] object-contain"
        />
        <p className="font-normal text-[18px] leading-[32.4px] text-white my-10">
            {content}
        </p>

        <div className="flex flex-row">
            <img src={img} alt={name} className=" rounded-full" />
            <div className="flex flex-col ml-4">
                <h4 className="font-semibold text-[20px] leading-[32px] text-white">
                    {name}
                </h4>
                <p className="font-normal text-[16px] leading-[24px] text-white">
                    {title}
                </p>
            </div>
        </div>
    </div>
);

export default FeedbackCard;