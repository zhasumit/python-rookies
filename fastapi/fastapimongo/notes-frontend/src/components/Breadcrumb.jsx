const Breadcrumb = ({ items }) => {
    return (
        <nav style={{
            width: '100%',
            backgroundColor: '#f6f8fa',
            borderBottom: '1px solid #ddd',
            fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '0.5rem 0',
            margin: 0
        }}>
            <ol style={{
                display: 'flex',
                listStyle: 'none',
                margin: '0 auto',
                padding: 0,
                fontSize: '0.75rem',
                maxWidth: '1200px',
                width: '100%'
            }}>
                {items.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        {index > 0 && (
                            <span style={{ margin: '0 0.25rem', color: '#656d76' }}>/</span>
                        )}
                        <a
                            href={item.link === '/notes' ? '/' : item.link}
                            style={{
                                color: index === items.length - 1 ? '#7ca8ea' : '#656d76',
                                textDecoration: 'none'
                            }}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
