const APP_NAME = 'SAMPLE INFERNO SSR';
const APP_TITLE_SEPARATOR = ' | ';

const MetaTag = (props: Record<string, unknown>) => <meta {...props} />;
const LinkTag = (props: Record<string, unknown>) => <link {...props} />;

const Head = (state: {
    data: {
        metaData: {
            pageTitle: string;
            metaDescription: unknown;
            metaKeywords: unknown;
        };
    };
}): JSX.Element => {
    return (
        <>
            <MetaTag charset='UTF-8' />
            <MetaTag
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
            <MetaTag http-equiv='X-UA-Compatible' content='ie=edge' />
            <LinkTag
                rel='shortcut icon'
                type='image/png'
                href='/images/favicon.png'
            />
            <title>
                {APP_NAME + APP_TITLE_SEPARATOR + state.data.metaData.pageTitle}
            </title>
            <MetaTag
                name='desription'
                content={state.data.metaData.metaDescription}
            />
            <MetaTag
                name='keywords'
                content={state.data.metaData.metaKeywords}
            />
        </>
    );
};

export default Head;
