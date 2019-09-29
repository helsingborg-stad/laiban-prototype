import React from 'react';
import Menu from './Menu.jsx';

const Navigation = props => (
    <Menu container>
        {props.links.map(link => (
            <Menu
                item
                to={link.to}
                key={link.to}
                icon={link.icon}
                columnSize={props.links.length > 4 ? 4 : 6}
            >
                {link.content}
            </Menu>
        ))}
    </Menu>
);

export default Navigation;
